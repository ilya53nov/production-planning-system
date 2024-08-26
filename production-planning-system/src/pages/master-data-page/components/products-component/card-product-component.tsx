import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { LineData, ProductData } from "../../../../utils/types/master-data-types"
import ModalEditLineComponent from "./modal-edit-line-component";
import { useDeleteLineData } from "../../../../services/hooks/linesData";

type CardProductComponentProps = {
  product: ProductData,
}

const CardProductComponent: React.FC<CardProductComponentProps> = ({product}: CardProductComponentProps) => {
  const deleteLineData = useDeleteLineData();

  const handleDeleteLineData = (id: string) => {
    deleteLineData.mutate({id})
  }

  return(
    <Card minWidth={'50px'}>
      <CardHeader>
        <Heading size='md'>{product.title.ru}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Категория линии
            </Heading>
            <Text pt='2' fontSize='sm'>
              {product.lineCategory}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Тип упаковки
            </Heading>

                <Text pt='2' fontSize='sm'>
                  {product.type}
                </Text>

          </Box>          
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex>
          {/* <ModalEditLineComponent {...line}/>
          <Button onClick={() => handleDeleteLineData(line.id!)} variant='solid' colorScheme='red'>
            Удалить
          </Button> */}
        </Flex>
      </CardFooter>
     </Card>
  )
}

export default CardProductComponent;













