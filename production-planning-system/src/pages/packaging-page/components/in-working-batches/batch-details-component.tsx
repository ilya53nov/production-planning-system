import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import { PackagingBatchDetailType } from "../../../../utils/types/types";
import { memo, ReactElement, ReactNode, useCallback } from "react";
import EditDetailsByBatchComponent from "./edit-details-by-batch-component";


interface IProps {
  props?: PackagingBatchDetailType,
  children: React.ReactNode;
}

const BatchDetailsComponent = ({children, props}: IProps) => {
  //const {id, dateAndtimeStart, shift, goodPacks} = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const EditBatchModalBody = ({children}: IProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay 
        bg='none'
        backdropFilter='auto'
        backdropInvert='20%'
        backdropBlur='2px'
      />
      <ModalContent>
        <ModalHeader>Редактирование</ModalHeader>
        <ModalCloseButton /> 
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )


  return(
    <Box onClick={() => onOpen() }>

      {children}
      <EditBatchModalBody>
        <EditDetailsByBatchComponent {...props!}/>
      </EditBatchModalBody>
    </Box>
  )
}

export default memo(BatchDetailsComponent);