import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { LineData } from "../../../../utils/types/master-data-types";
import LineFormComponent from "./line-form-component";

const ModalEditLineComponent: React.FC<LineData> = (line: LineData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Button variant='solid' colorScheme='blue' onClick={() => onOpen()}>Редактировать</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Редактирование данных</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LineFormComponent isNew={false} line={line} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalEditLineComponent;