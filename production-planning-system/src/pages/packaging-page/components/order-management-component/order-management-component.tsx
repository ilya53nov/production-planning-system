import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import React from "react"
import OrdersAwaitingPackagingComponent from "../orders-awaiting-packaging/orders-awaiting-packaging-component"

type DrawerExampleProps = {
  isOpen: boolean, 
  onClose(): void,
}

const OrderManagementDrawer: React.FC<DrawerExampleProps> = ({isOpen, onClose}: DrawerExampleProps) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size={'md'}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"x-large"} borderBottomWidth='1px'>
            <Center>
              Управление заказами
            </Center> 
          </DrawerHeader>

          <DrawerBody backgroundColor={"gray.100"}>
            <OrdersAwaitingPackagingComponent />
          </DrawerBody>          
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default OrderManagementDrawer;