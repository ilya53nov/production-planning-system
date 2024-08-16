import { Box } from "@chakra-ui/react";
import LinesComponent from "./components/lines-component/lines-component";
import CreateNewLineFormComponent from "./components/lines-component/line-form-component";
import ModalCreateLineComponent from "./components/lines-component/modal-create-line-component";
import CardsLineComponent from "./components/lines-component/cards-line-component";

const MasterDataPage: React.FC = () => {
  return (
    <Box>
      <ModalCreateLineComponent />
      <CardsLineComponent />
    </Box>
  )
}

export default MasterDataPage;