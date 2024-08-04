import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useGetNotCompletedBatches, useUpdateBatch } from "../../../../services/hooks/useBatches";
import CreateNewBatchFormComponent from "../create-new-batch-form/create-new-batch-form-component";
import PackagingLinesFormComponent from "../packaging-lines-form/packaging-lines-form-component";

const CurrentOrdersListComponent: React.FC = () => {
  const {data: batches, isError, error, isLoading, isSuccess} = useGetNotCompletedBatches();
  const mutation = useUpdateBatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  

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
      <Button onClick={onOpen}>Создать новый заказ</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание нового заказа</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateNewBatchFormComponent />
          </ModalBody>
        </ModalContent>
      </Modal>


        

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
                <Button onClick={() => handleUpdateBatch(batch.id!)}>Завершить заказ</Button>
              </li>
            </ul>
            )
          })}
        </ul>


        <PackagingLinesFormComponent />

        
      </div>

    )
  }


}

export default CurrentOrdersListComponent;