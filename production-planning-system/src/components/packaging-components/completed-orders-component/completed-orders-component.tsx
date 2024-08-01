import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBatches, useCreateBatch } from "../../../services/hooks/useBatches";

const PackagingCompletedOrdersComponent: React.FC = () => {
  const {data: batches, isLoading, isSuccess, isError, error} = useBatches();
  const mutation = useCreateBatch();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  if (isSuccess) {
    return (
      <div>
        <div>completed-orders-component</div>
        <button onClick={() => mutation.mutate({...batches[0], id: `sss${batches.length}`})}>Create batch</button>
        <ul>
          {batches.map((batch) => {
            return(
              <li key={batch.id}>{batch.packagingBatch.product.title.ru}</li>
            )
          })}
        </ul>

        <ToastContainer />
      </div>
  
    )
  }



}

export default PackagingCompletedOrdersComponent;