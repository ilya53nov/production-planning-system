import { Box } from "@chakra-ui/react";
import LinesComponent from "./components/lines-component/lines-component";
import CreateNewLineFormComponent from "./components/lines-component/create-line-component";

const MasterDataPage: React.FC = () => {
  return (
    <Box>
      <CreateNewLineFormComponent />
      <LinesComponent />
    </Box>
  )
}

export default MasterDataPage;