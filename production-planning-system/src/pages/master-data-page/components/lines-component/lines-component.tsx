import { Box } from "@chakra-ui/react";
import React from "react";
import ModalCreateLineComponent from "./modal-create-line-component";
import CardsLineComponent from "./cards-line-component";

const LinesComponent: React.FC = () => {  
  return(
    <Box>
      <ModalCreateLineComponent />
      <CardsLineComponent />
    </Box>
  )  
}

export default LinesComponent;