import { Box, Flex } from "@chakra-ui/react";
import { PackagingBatchDetailType } from "../../../../utils/types/types";
import dayjs from "dayjs";
import { memo } from "react";

const BatchDetail: React.FC<PackagingBatchDetailType> = (props: PackagingBatchDetailType) => {
  const {id, dateAndtimeStart, shift, goodPacks} = props;

  return(
    <Flex  _hover={{color: 'blue.600'}} >                              
      <Box pl={"10px"}>{dayjs(dateAndtimeStart).format('DD.MM.YYYY')}</Box>
      <Box pl={"10px"}>{dayjs(dateAndtimeStart).format('HH:mm')}</Box>
      <Box pl={"10px"}>{shift}</Box>
      <Box pl={"10px"}>{goodPacks}</Box>               
    </Flex>
  )
}

export default memo(BatchDetail);