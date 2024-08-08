import { Box, Flex } from "@chakra-ui/react";
import { useGetPackagingBatchDetailByBatchId } from "../../../../services/hooks/packaging-batch-detail-hook";
import dayjs from "dayjs";

type BatchDetailsComponentProps = {
  id: string;
}

const BatchDetailsComponent: React.FC<BatchDetailsComponentProps> = ({id}: BatchDetailsComponentProps) => {
  const {data: details, isSuccess, isLoading, } = useGetPackagingBatchDetailByBatchId(id);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess && details.length > 0) {
    return(
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
    )
  }
}

export default BatchDetailsComponent;