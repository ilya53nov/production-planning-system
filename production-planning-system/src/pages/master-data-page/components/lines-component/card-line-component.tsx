import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { LinesData } from "../../../../utils/types/master-data-types"
import ModalEditLineComponent from "./modal-edit-line-component";
import { useDeleteLineData } from "../../../../services/hooks/linesData";

type CardLineComponentProps = {
  line: LinesData,
}

const CardLineComponent: React.FC<CardLineComponentProps> = ({line}: CardLineComponentProps) => {
  const deleteLineData = useDeleteLineData();

  const handleDeleteLineData = (id: string) => {
    deleteLineData.mutate({id})
  }

  return(
    <Card minWidth={'50px'}>
      <CardHeader>
        <Heading size='md'>{line.title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Категория линии
            </Heading>
            <Text pt='2' fontSize='sm'>
              {line.category}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Тип упаковки
            </Heading>
            {line.type.map((type, index) => {
              return(
                <Text key={`${type}${index}`} pt='2' fontSize='sm'>
                  {type}
                </Text>
              )
            })}
          </Box>          
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex>
          <ModalEditLineComponent {...line}/>
          <Button onClick={() => handleDeleteLineData(line.id!)} variant='solid' colorScheme='red'>
            Удалить
          </Button>
        </Flex>
      </CardFooter>
     </Card>
  )
}

export default CardLineComponent;













