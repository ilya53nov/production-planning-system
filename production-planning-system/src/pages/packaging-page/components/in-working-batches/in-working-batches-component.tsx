import { Box, Flex } from "@chakra-ui/react";
import { useBatchById, useBatches, useGetNotComletedBatchesWithPackagingDetail } from "../../../../services/hooks/useBatches";
import { LinesData } from "../../../../utils/types/types";
import { useGetPackagingBatchDetailByBatchId } from "../../../../services/hooks/packaging-batch-detail-hook";
import {packagingBatchDetailService} from "../../../../services/api/services/packaging-batch-detail-service"
import dayjs from "dayjs";
import BatchDetailsComponent from "./batch-details-component";
import { useQueries } from "@tanstack/react-query";

const InWorkingBatchesComponent: React.FC<LinesData> = ({line}) => {
  //const {data: batches, isSuccess, isLoading} = useGetNotComletedBatchesWithPackagingDetailByLine(line);

  //const {data: test, isSuccess: isSuccessTest} = useGetNotComletedBatchesWithPackagingDetail();

  // const {data: batch} = useBatchById(batches![0].id!);
  // console.log('testBatchEmbed',batch);
//   const batchesQueries = useQueries(
//     batches.map(batch => ({
//        queryKey: ['user', batch.id],
//        queryFn: () => useGetPackagingBatchDetailByBatchId(batch.id),
//        enabled: !!batches,
//     }))
//  );

  const {data: batches, isLoading, isSuccess} = useBatches();

  if (isLoading) {
    return <span>Loading...</span>
  }

  // if (isSuccessTest) {
    
  // }

  if (isSuccess) {
    const notComletedAndCurrentLine = batches.filter((batch) => batch.isBatchCompletedSap === false && batch.line === line && batch.packagingBatchDetails!.length > 0)

    console.log('test',notComletedAndCurrentLine)

    //console.log(batchQueries);
    return(
      <div>
        {notComletedAndCurrentLine.map((batch) => {
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
                  {batch.packagingBatchDetails!.map((detailItem) => {
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
                {/* <BatchDetailsComponent id={batch.id!}  /> */}
              </ul>
            )          
        })}
      </div>
    )
  }


}

export default InWorkingBatchesComponent;