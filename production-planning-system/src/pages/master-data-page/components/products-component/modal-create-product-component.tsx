import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import ProductFormComponent from "./product-form-component";

const ModalCreateProductComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Button onClick={() => onOpen()}>Добавить препарат</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Добавление данных по новому препарату</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductFormComponent isNew={true} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateProductComponent;