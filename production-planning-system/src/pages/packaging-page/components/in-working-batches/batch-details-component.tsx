import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import { PackagingBatchDetailType, PackagingBatchType } from "../../../../utils/types/types";
import { memo, ReactElement, ReactNode, useCallback } from "react";
import EditDetailsByBatchComponent from "./edit-details-by-batch-component";


interface BatchDetailsComponentProps {
  batchDetailsListItem: PackagingBatchDetailType,
  batchInfo: PackagingBatchType,
  children: React.ReactNode;
}

interface EditBatchModalBodyProps {
  children: React.ReactNode;
}

const BatchDetailsComponent = ({children, batchDetailsListItem, batchInfo}: BatchDetailsComponentProps) => {
  const {product, batchNumber} = batchInfo;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const EditBatchModalBody = ({children}: EditBatchModalBodyProps) => (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay 
        // bg='none'
        // backdropFilter='auto'
        // backdropInvert='20%'
        // backdropBlur='2px'
      />
      <ModalContent minW={'1000px'}>
        <ModalHeader>
          <Flex gap={'20px'}>
            <Box>{product?.title.ru}</Box>
            <Box>{batchNumber}</Box>
          </Flex>
        </ModalHeader>
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
        <EditDetailsByBatchComponent props={batchDetailsListItem} closeModal={onClose}/>
      </EditBatchModalBody>
    </Box>
  )
}

export default memo(BatchDetailsComponent);