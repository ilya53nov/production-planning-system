import { Button, useDisclosure } from "@chakra-ui/react";
import { useGetNotCompletedBatches, useUpdateBatch } from "../../../../services/hooks/useBatches";
import PackagingLinesFormComponent from "../packaging-lines-form/packaging-lines-form-component";
import { AddIcon } from "@chakra-ui/icons";
import OrderManagementDrawer from "../order-management-component/order-management-component";

const CurrentOrdersListComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()    

  return (
    <div>
      <Button right={0} position={"absolute"} leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Управление заказами
      </Button>
      <OrderManagementDrawer isOpen={isOpen} onClose={onClose}/>
              
    </div>
  )

}

export default CurrentOrdersListComponent;