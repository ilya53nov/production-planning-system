import { useState } from "react";
import { useBatches, useGetNotCompletedBatches } from "../../../../services/hooks/useBatches";
import { Box, Button, Divider, Flex, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import EditBatchFormComponent from "../edit-batch-form/edit-batch-form-component";
import CreateNewBatchFormComponent from "../create-new-batch-form/create-new-batch-form-component";
import { useGetLinesData } from "../../../../services/hooks/linesData";
import StartPackagingBatchFormComponent from "../start-packaging-batch-form/start-packaging-batch-form-component";

const OrdersAwaitingPackagingComponent: React.FC = () => {
  const {data: batches, isError, error, isLoading, isSuccess: isSuccessBatches} = useBatches();
  const {data: lines, isSuccess: isSuccessLines} = useGetLinesData();
  const [line, setLine] = useState('IMA 1');
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const CreatBatchModalBody = () => (
    <ModalContent>
      <ModalHeader>Создание нового заказа</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CreateNewBatchFormComponent line={line}/>
      </ModalBody>
    </ModalContent>
  )

  const EditBatchModalBody = ({batchId}: any) => (
    <ModalContent>
      <ModalHeader>Редактирование</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <EditBatchFormComponent id={batchId} />
      </ModalBody>
    </ModalContent>    
  )

  const StartPackagingBatchModalBody = ({batchId}: any) => (
    <ModalContent>
      <ModalHeader>Начало упаковки</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <StartPackagingBatchFormComponent id={batchId} closeModal={onCloseEdit}/>
      </ModalBody>
    </ModalContent>    
  )

  const [modalBody, setModalBody] = useState(<CreatBatchModalBody />);

  if (isLoading) {
    <span>Loading...</span>
  }

  if (isError) {
    <span>Error: {error.message}</span>
  }

  if (isSuccessBatches && isSuccessLines) {
    const filteredBatchesByLine = batches.filter((batch) => batch.isBatchCompletedSap === false && batch.line === line && batch.packagingBatchDetails!.length === 0);


    return(
      <div>
        <Box w={'1000px'}>
          <Flex justifyContent={'space-around'}>
          {lines.map((item) => {
            return(
              <Box 
                key={item.line}
                textAlign={'center'}
                width={'150px'}
                borderBottom={'2px'}
                borderColor={item.line === line ? 'blue' : 'red'}
                cursor={'pointer'}
                fontSize={'large'}
                fontWeight={item.line === line ? '700' : '400'}
                _hover={{ borderBottom:'2px', borderColor:'blue' }}
                onClick={() => setLine(item.line)}>{item.line}</Box>
            )
          })}
          </Flex>
        </Box>

        <Button onClick={() => {
                setModalBody(<CreatBatchModalBody />)
                onOpenEdit()
              }}>создать новый заказ</Button>

        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay 
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='2px'
          />
            {modalBody}
        </Modal>

        {filteredBatchesByLine.map((item) => {
          return(
            <div key={item.id}>
              <Grid w={'1000px'} templateColumns='repeat(6, 1fr)' gap={6} >
                <Box w={'200px'}>{item.product?.title.ru}</Box>
                <Box>{item.orderNumber}</Box>
                <Box>{item.batchNumber}</Box>
                <Box>{item.batchNumberSap}</Box>
                <Button onClick={() => {
                  setModalBody(<EditBatchModalBody batchId={item.id}/>)
                  onOpenEdit()
                }}>редактировать</Button>
                <Button onClick={() => {
                  setModalBody(<StartPackagingBatchModalBody batchId={item.id}/>)
                  onOpenEdit()
                }}>старт</Button>
              </Grid>
              <Divider orientation='horizontal' />
            </div>
          )
        })}  
      </div>
    )
  }

}

export default OrdersAwaitingPackagingComponent;