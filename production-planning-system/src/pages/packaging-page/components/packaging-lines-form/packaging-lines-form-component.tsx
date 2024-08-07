import { Flex, Spacer } from "@chakra-ui/react";
import InWorkingBatchesComponent from "../in-working-batches/in-working-batches-component";
import OrdersAwaitingPackagingComponent from "../orders-awaiting-packaging/orders-awaiting-packaging-component";

const PackagingLinesFormComponent: React.FC = () => {
  return(
    <Flex marginTop={'100px'}>
      <InWorkingBatchesComponent line="IMA 1"/>
    <Spacer/>
      <OrdersAwaitingPackagingComponent />
    </Flex>

  )

}

export default PackagingLinesFormComponent;