import { Box, Card, CardBody, CardHeader, Text, Flex, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { useBatchById, useBatches, useGetNotComletedBatchesWithPackagingDetail } from "../../../../services/hooks/useBatches";
import { LinesData } from "../../../../utils/types/types";
import { useGetPackagingBatchDetailByBatchId } from "../../../../services/hooks/packaging-batch-detail-hook";
import {packagingBatchDetailService} from "../../../../services/api/services/packaging-batch-detail-service"
import dayjs from "dayjs";
import BatchDetailsComponent from "./batch-details-component";
import { useQueries } from "@tanstack/react-query";

const InWorkingBatchesByLineComponent: React.FC<LinesData> = ({line}) => {
  const {data: batches, isLoading, isSuccess} = useBatches();

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isSuccess) {
    const notComletedAndCurrentLine = batches.filter((batch) => batch.isBatchCompletedSap === false && batch.line === line && batch.packagingBatchDetails!.length > 0)

    return(
      <>
        {notComletedAndCurrentLine.map((item) => {
          return(
            <Card key={item.id} mt={"10px"}>
              <CardHeader>
                <Flex gap={"10px"}>
                  <Heading size='md'>{item.product?.title.ru}</Heading>
                  <Text>{item.batchNumber}</Text>
                  <Text>{item.orderNumber}</Text>
                  <Text>{item.batchNumberSap}</Text>
                </Flex>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {item.packagingBatchDetails?.map((detailsItem) => {
                      return(
                        <Box key={detailsItem.id}>
                          <Flex  _hover={{color: 'blue.600'}} >                              
                            <Box pl={"10px"}>{dayjs(detailsItem.dateAndtimeStart).format('DD.MM.YYYY')}</Box>
                            <Box pl={"10px"}>{dayjs(detailsItem.dateAndtimeStart).format('HH:mm')}</Box>
                            <Box pl={"10px"}>{detailsItem.shift}</Box>
                            <Box pl={"10px"}>{detailsItem.goodPacks}</Box>               
                          </Flex>
                        </Box>
                      )
                    })}
                                    
                </Stack>
              </CardBody>
            </Card>
          )
        })}

      </>
    )
  }


}

export default InWorkingBatchesByLineComponent;