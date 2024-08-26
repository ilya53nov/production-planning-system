import { Box, SimpleGrid } from "@chakra-ui/react";
import { useGetLinesData } from "../../../../services/hooks/linesData"
import { useGetProductsData } from "../../../../services/hooks/productsData";
import CardProductComponent from "./card-product-component";

const CardsProductComponent: React.FC = () => {
  const {data: products, isError, error, isLoading, isSuccess} = useGetProductsData();

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (isError) {
    return <Box>{error.message}</Box>
  }

  if (isSuccess) {
    return(
      <SimpleGrid px={'100px'} columns={4} spacing={10}>  

        {products.map((product) => {
          return(
            <CardProductComponent key={product.id} product={product} />
          )
        })}
      </SimpleGrid>
    )
  }
}

export default CardsProductComponent;