import { Box, Button, Flex, Spacer, Stack, StackDivider } from "@chakra-ui/react";
import OrdersAwaitingPackagingComponent from "../orders-awaiting-packaging/orders-awaiting-packaging-component";
import InWorkingBatchesByLineComponent from "../in-working-batches/in-working-batches-by-line-component";
import { useGetLinesData } from "../../../../services/hooks/linesData";
import { useState } from "react";

const PackagingLinesFormComponent: React.FC = () => {
  const {data: lines, isLoading, isSuccess} = useGetLinesData();
  const [line, setLine] = useState('IMA 1');

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess) {
    return(
      <>
        <Flex gap={"10px"} justifyContent={"center"}>

          {lines.map((item) => {
            return(

              <Button px={"50px"} isActive={item.line === line} colorScheme="teal" onClick={() => setLine(item.line)}>
                {item.line}
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