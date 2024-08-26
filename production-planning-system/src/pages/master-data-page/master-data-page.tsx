import { Box, Button, Flex } from "@chakra-ui/react";
import LinesComponent from "./components/lines-component/lines-component";
import { useState } from "react";
import ProductsComponent from "./components/products-component/products-component";

const MasterDataPage: React.FC = () => {
  const navigationItems = [
    'Линии',
    'Препараты',
  ]

  const [currentTab, setCurrentTab] = useState(navigationItems[0]);

  return (
    <div>
      Мастер данные
      <Flex gap={'10px'} justifyContent={'center'}>
        {navigationItems.map((navItem) => {
          return(
            <Button key={navItem} px={"50px"} isActive={navItem === currentTab} colorScheme="teal" onClick={() => setCurrentTab(navItem)}>
              {navItem}
            </Button>
          )
        })}
      </Flex>
      {currentTab === 'Линии' ? <LinesComponent /> : ''}
      {currentTab === 'Препараты' ? <ProductsComponent /> : ''}
    </div>
  )
}

export default MasterDataPage;