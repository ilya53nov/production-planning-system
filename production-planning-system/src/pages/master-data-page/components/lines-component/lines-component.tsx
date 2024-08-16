import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useGetLinesData } from "../../../../services/hooks/linesData";

const LinesComponent:  React.FC = () => {
  const {data: lines, isError, error, isLoading, isSuccess} = useGetLinesData();

  console.log(lines)

  if (isError) {
    return <Box>Error: {error.message}</Box>
  }

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (isSuccess) {
    return(
      <Flex direction={"column"}>
      {lines.map((line) => {
        return(
          <Flex key={line.id}>
            <Box>{line.title}</Box>
          </Flex>
        )
      })}
      </Flex>
    )
  }
}

export default LinesComponent;