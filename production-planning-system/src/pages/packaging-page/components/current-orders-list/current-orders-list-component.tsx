import { useGetNotCompletedBatches, useUpdateBatch } from "../../../../services/hooks/useBatches";
import CreateNewBatchFormComponent from "../create-new-batch-form/create-new-batch-form-component";

const CurrentOrdersListComponent: React.FC = () => {
  const {data: batches, isError, error, isLoading, isSuccess} = useGetNotCompletedBatches();
  const mutation = useUpdateBatch();
  

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>{error.message}</span>
  }

  if (isSuccess) {
    const handleUpdateBatch = (id: string) => {
      const filteredBatch = batches.filter((batch) => batch.id === id)[0];
      const isBatchCompletedSap = filteredBatch.packagingBatch?.isBatchCompletedSap;

      console.log(isBatchCompletedSap);

      mutation.mutate(
        {
          ...filteredBatch ,
            packagingBatch: {
              ...filteredBatch.packagingBatch,
                isBatchCompletedSap: !isBatchCompletedSap,
            }
        }
      );
    }

    return (
      <div>
        <CreateNewBatchFormComponent />

        <ul>
          {batches.map((batch) => {
            return (
            <ul key={batch.id} style={{display: 'flex', listStyle: 'none', gap: '10px'}}>
              <li key={batch?.packagingBatch?.product?.title.ru}>
                {batch?.packagingBatch?.product?.title.ru}
              </li>
              <li key={batch?.packagingBatch?.batchNumberSap}>
                {batch?.packagingBatch?.batchNumberSap}
              </li>
              <li key={batch?.packagingBatch?.batchNumber}>
                {batch?.packagingBatch?.batchNumber}
              </li>
              <li key={batch?.packagingBatch?.goodPacks}>
                {batch?.packagingBatch?.goodPacks}
              </li>
              <li key='updateButton'>
                <button onClick={() => handleUpdateBatch(batch.id!)}>Update</button>
              </li>
            </ul>
            )
          })}
        </ul>
      </div>

    )
  }


}

export default CurrentOrdersListComponent;