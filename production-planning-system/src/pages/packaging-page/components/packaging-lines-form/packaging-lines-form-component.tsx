import { useState } from "react";
import { useGetNotCompletedBatches } from "../../../../services/hooks/useBatches";
import { Box, Button, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import EditBatchFormComponent from "../edit-batch-form/edit-batch-form-component";

const PackagingLinesFormComponent: React.FC = () => {
  const {data: batches, isError, error, isLoading, isSuccess} = useGetNotCompletedBatches();
  const [line, setLine] = useState('IMA 1');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batchId, setBachId] = useState('');

  if (isLoading) {
    <span>Loading...</span>
  }

  if (isError) {
    <span>Error: {error.message}</span>
  }

  if (isSuccess) {
    const filteredBatchesByLine = batches.filter((batch) => batch.packagingBatch?.line === line);


    return(
      <div>
        <ul>
          <li onClick={() => setLine('IMA 1')}>IMA 1</li>
          <li onClick={() => setLine('IMA 2')}>IMA 2</li>
          <li onClick={() => setLine('IMA 3')}>IMA 3</li>
        </ul>

        <Button onClick={onOpen}>Создать новый заказ</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Создание нового заказа</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditBatchFormComponent id={batchId} />
            </ModalBody>
          </ModalContent>
        </Modal>

        {filteredBatchesByLine.map((item) => {
          return(
            <Grid w={'800px'} templateColumns='repeat(5, 1fr)' gap={6} key={item.id}>
              <Box w={'200px'}>{item.packagingBatch?.product?.title.ru}</Box>
              <Box>{item.packagingBatch?.orderNumber}</Box>
              <Box>{item.packagingBatch?.batchNumber}</Box>
              <Box>{item.packagingBatch?.batchNumberSap}</Box>
              <Button onClick={() => {
                setBachId(item!.id!);
                onOpen()
              }}>редактировать</Button>
            </Grid>
          )
        })}

        <ul>

        </ul>
  
      </div>
    )
  }


}

export default PackagingLinesFormComponent;