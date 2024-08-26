import { Box } from "@chakra-ui/react";
import React from "react";
import ModalCreateProductComponent from "./modal-create-product-component";
import CardsProductComponent from "./cards-product-component";

const ProductsComponent: React.FC = () => {  
  return(
    <Box>
      <ModalCreateProductComponent />
      <CardsProductComponent />
    </Box>
  )  
}

export default ProductsComponent;