import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { useGetLinesData } from "../../../../services/hooks/linesData"
import { LinesData } from "../../../../utils/types/master-data-types"
import CardLineComponent from "./card-line-component";

const CardsLineComponent: React.FC = () => {
  const {data: lines, isError, error, isLoading, isSuccess} = useGetLinesData();

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (isError) {
    return <Box>{error.message}</Box>
  }

  if (isSuccess) {
    return(
      <SimpleGrid px={'100px'} columns={4} spacing={10}>  

        {lines.map((line) => {
          return(
            <CardLineComponent key={line.id} line={line} />
          )
        })}
      </SimpleGrid>
    )
  }
}

export default CardsLineComponent;