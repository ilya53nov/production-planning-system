import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import LineFormComponent from "./line-form-component";

const ModalCreateLineComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Button onClick={() => onOpen()}>Добавить линию</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Добавление данных по новой линии</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LineFormComponent isNew={true} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateLineComponent;