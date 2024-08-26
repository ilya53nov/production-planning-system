import { Box, Button, Flex, Spacer, Stack, StackDivider } from "@chakra-ui/react";
import OrdersAwaitingPackagingComponent from "../orders-awaiting-packaging/orders-awaiting-packaging-component";
import InWorkingBatchesByLineComponent from "../in-working-batches/in-working-batches-by-line-component";
import { useGetLinesData } from "../../../../services/hooks/linesData";
import { useState } from "react";
import { LineCategoryEnum } from "../../../../utils/types/master-data-types";

const PackagingLinesFormComponent: React.FC = () => {
  const {data: lines, isLoading, isSuccess} = useGetLinesData();
  const [line, setLine] = useState('IMA 1');

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess) {
    const sortedLines = lines.sort((prev, next) => prev.number - next.number)
    return(
      <>
        <Flex gap={"10px"} justifyContent={"center"}>

          {sortedLines.map((lineItem) => {
            return(

              <Button key={lineItem.id} px={"50px"} isActive={lineItem.title === line} colorScheme="teal" onClick={() => setLine(lineItem.title)}>
                {lineItem.title}
              </Button>
            )
          })}
        </Flex>

        <Flex direction={"column"} gap={"10px"} marginTop={'100px'}>
          <InWorkingBatchesByLineComponent line={line}/>
        </Flex>
      </>

  
    )
  }



}

export default PackagingLinesFormComponent;