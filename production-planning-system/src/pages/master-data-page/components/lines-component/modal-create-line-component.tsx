import { Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import LineFormComponent from "./line-form-component";
import OrdersAwaitingPackagingComponent from "../../../packaging-page/components/orders-awaiting-packaging/orders-awaiting-packaging-component";

const ModalCreateLineComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Button onClick={() => onOpen()}>Добавить линию</Button>


      <Drawer
        isOpen={isOpen}
        placement='top'
        size={'md'}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"x-large"} borderBottomWidth='1px'>
            <Center>
            Добавление данных по новой линии
            </Center> 
          </DrawerHeader>

          <DrawerBody>
            <LineFormComponent isNew={true} onClose={onClose} />
          </DrawerBody>          
        </DrawerContent>
      </Drawer>


      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Добавление данных по новой линии</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LineFormComponent isNew={true} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  )
}

export default ModalCreateLineComponent;