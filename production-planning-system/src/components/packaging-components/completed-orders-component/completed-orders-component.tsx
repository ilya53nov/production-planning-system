import { useCreateBatch, useGetCompletedBatches, useUpdateBatch,  } from "../../../services/hooks/useBatches";

const PackagingCompletedOrdersComponent: React.FC = () => {
  const {data: batches, isLoading, isSuccess, isError, error} = useGetCompletedBatches();
  //const mutation = useCreateBatch();
  const mutation = useUpdateBatch();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
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
        <div>completed-orders-component</div>
        {/* <button onClick={() => mutation.mutate({...batches[0], id: `sss${batches.length}`})}>Create batch</button> */}
        <ul>
          {batches.map((batch) => {
            return(
              <ul key={batch.id}>
                <li key={batch.id}>
                  {batch?.packagingBatch?.product?.title.ru}
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

export default PackagingCompletedOrdersComponent;