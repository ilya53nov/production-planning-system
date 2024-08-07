import { Box, Flex } from "@chakra-ui/react";
import { useGetNotComletedBatchesWithPackagingDetail, useGetNotComletedBatchesWithPackagingDetailByLine } from "../../../../services/hooks/useBatches";
import { LinesData } from "../../../../utils/types/types";
import { useGetPackagingBatchDetailByBatchId } from "../../../../services/hooks/packaging-batch-detail-hook";
import dayjs from "dayjs";

const InWorkingBatchesComponent: React.FC<LinesData> = ({line}) => {
  const {data: batches, isSuccess, isLoading} = useGetNotComletedBatchesWithPackagingDetailByLine(line);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isSuccess) {
    //const {} = useGetPackagingBatchDetailByBatchId();
    console.log(batches);

    return(
      <div>
        {batches.map((batch) => {
          const {data: details, isSuccess: isSuccessDetails, isLoading: isLoadingDetails, } = useGetPackagingBatchDetailByBatchId(batch.id!);

          // if (isLoadingDetails) {
          //   return <span>Loading...</span>
          // }

          if (isSuccessDetails) {
            return(
              <ul key={batch.id}>
                <ul>
                  <li>
                    <Flex gap={'10px'}>
                      <Box>{batch.product?.title.ru}</Box>
                      <Box>{batch.batchNumber}</Box>
                    </Flex>
                  </li>
                </ul>
                <ul>
                  {details.length && details.map((detailItem) => {
                    return(
                      <li key={detailItem.id}>
                        <Flex gap={'10px'}>
                          <Box>{dayjs(detailItem.dateAndtimeStart).format('DD.MM.YYYY')}</Box>
                          <Box>{dayjs(detailItem.dateAndtimeStart).format('HH:mm')}</Box>
                        </Flex>
                      </li>
                    )
                  })}
  
  
                </ul>
              </ul>
            )
          }

          
        })}


        {/* <ul>
          {batches.map((batch) => {
            return(
              <li key={batch.id}>
                <Flex gap={'10px'}>
                  <Box>{batch.product?.title.ru}</Box>
                  <Box>{batch.batchNumber}</Box>
                </Flex>
              </li>
            )
          })}
        </ul> */}
      </div>
    )
  }


}

export default InWorkingBatchesComponent;