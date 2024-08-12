import { useState } from "react";
import { useBatches, useGetNotCompletedBatches } from "../../../../services/hooks/useBatches";
import { Box, Button, Card, CardBody, CardHeader, Center, Divider, Flex, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, StackDivider, Tooltip, useDisclosure } from "@chakra-ui/react";
import EditBatchFormComponent from "../edit-batch-form/edit-batch-form-component";
import CreateNewBatchFormComponent from "../create-new-batch-form/create-new-batch-form-component";
import { useGetLinesData } from "../../../../services/hooks/linesData";
import StartPackagingBatchFormComponent from "../start-packaging-batch-form/start-packaging-batch-form-component";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const OrdersAwaitingPackagingComponent: React.FC = () => {
  const {data: batches, isError, error, isLoading, isSuccess: isSuccessBatches} = useBatches();
  //const {data: lines, isSuccess: isSuccessLines} = useGetLinesData();
  const [line, setLine] = useState('IMA 1');
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const CreateBatchModalBody = () => (
    <ModalContent>
      <ModalHeader>Создание нового заказа</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CreateNewBatchFormComponent line={''}/>
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

  const [modalBody, setModalBody] = useState(<CreateBatchModalBody />);

  if (isLoading) {
    <span>Loading...</span>
  }

  if (isError) {
    <span>Error: {error.message}</span>
  }

  if (isSuccessBatches) {
    const filteredBatches = batches.filter((batch) => batch.isBatchCompletedSap === false && batch.packagingBatchDetails!.length === 0);
    const lines = [...new Set(batches.map((batch) => batch.line))];    

    return(
      <div>
        <Flex justifyContent={"center"}>
          <Button textTransform={"uppercase"} colorScheme="teal" onClick={() => {
                  setModalBody(<CreateBatchModalBody />)
                  onOpenEdit()
                }}>создать новый заказ
          </Button>
        </Flex>

        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay 
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='2px'
          />
            {modalBody}
        </Modal>

        {lines.map((line) => {
          const filteredBatchesByLine = filteredBatches.filter((batch) => batch.line === line);

          return(
            <Card key={line} mt={"10px"}>
              <CardHeader>
                <Heading size='md'>{line}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  
                    {filteredBatchesByLine.map((item) => {
                      return(
                        <Box key={item.id}>
                          <Flex  _hover={{color: 'blue.600'}} >
                            
                              <Tooltip label='Начать заказ'>
                                <Center onClick={() => {
                                      setModalBody(<StartPackagingBatchModalBody batchId={item.id}/>)
                                      onOpenEdit()
                                    }}
                                    cursor={"pointer"}>
                                  <ArrowLeftIcon color={"teal"}/>
                                </Center>
                              </Tooltip>
                            
                            <Flex onClick={() => {
                                setModalBody(<EditBatchModalBody batchId={item.id}/>)
                                onOpenEdit()
                              }}
                              cursor={"pointer"}   
                              direction={"column"}             
                            >
                              <Heading pl={"10px"} size='xs' textTransform='uppercase'>
                                {item.product?.title.ru}
                              </Heading>

                              <Flex>
                                <Box pl={"10px"}>Серия: {item.batchNumber}</Box>
                                <Box pl={"10px"}>Заказ: {item.orderNumber}</Box>
                                <Box pl={"10px"}>Заказ SAP: {item.batchNumberSap}</Box>
                              </Flex>
                            </Flex>

                          </Flex>
                        </Box>
                      )
                    })}  
                                    
                </Stack>
              </CardBody>
            </Card>

          )
        })}        
      </div>
    )
  }

}

export default OrdersAwaitingPackagingComponent;