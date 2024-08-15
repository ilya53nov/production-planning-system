import { FieldApi, useForm } from "@tanstack/react-form";
import { PackagingBatchDetailType, Shift } from "../../../../utils/types/types";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useUpdatePackagingBatchDetails } from "../../../../services/hooks/packaging-batch-detail-hook";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Проверка поля...' : null}
    </> 
  )
}

type EditDetailsByBatchComponentProps = {
  props: PackagingBatchDetailType,
  closeModal: () => void,
}

const EditDetailsByBatchComponent: React.FC<EditDetailsByBatchComponentProps> = ({props, closeModal}: EditDetailsByBatchComponentProps) => {
  const {dateAndtimeStart, shift, goodPacks, dateAndtimeEnd, badPacks} = props;
  const mutation = useUpdatePackagingBatchDetails();
  const shifts = ['1', '2'];



  const form = useForm({
    defaultValues: {
      dateAndtimeStart: dayjs(dateAndtimeStart).format('YYYY-MM-DDTHH:mm'),
      shift: shift,
      dateAndtimeEnd: dayjs(dateAndtimeEnd).format('YYYY-MM-DDTHH:mm'),
      goodPacks: goodPacks || '',
      badPacks: badPacks || '',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(Object.assign({...props}, {...value}),

        {
          onSuccess: () => closeModal(),
          onError: (err) => console.log(err.message)
        }
      )
    },
  })

  return(
    <div>
      <Flex>
        <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
        <Flex gap={'20px'}>
          <div>
            <form.Field
              name="dateAndtimeStart"
              validators={{
                onChange: ({ value }) => !value ? 'Обязательное поле' : undefined,
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Дата и время начала:</FormLabel>
                    <Input type="datetime-local" w={'200px'} id={field.name} name={field.name}
                      value={field.state.value || new Date().toLocaleDateString()}
                      onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Box h={"30px"}><FieldInfo field={field} /></Box>
                  </FormControl>
                </>
              )}
            />
          </div>
          
          <div>
            <form.Field
              name="shift"
              validators={{
                onChange: ({ value }) => !value ? 'Обязательное поле' : undefined,
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Смена:</FormLabel>
                    <Select w={'70px'} id={field.name} name={field.name}
                      value={field.state.value || ''} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}
                      >                        
                      {shifts.map((item) => {
                        return(
                          <option key={item} value={item}>{item}</option>
                        )
                      })}
                    </Select>
                    <Box h={"30px"}><FieldInfo field={field} /></Box>
                  </FormControl>
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="dateAndtimeEnd"
              validators={{
                onChange: ({ value }) => !value ? 'Обязательное поле' : undefined,
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Дата и время окончания:</FormLabel>
                    <Input type="datetime-local" w={'200px'} id={field.name} name={field.name}
                      value={field.state.value || new Date().toLocaleDateString()}
                      onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Box h={"30px"}><FieldInfo field={field} /></Box>
                  </FormControl>
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="goodPacks"
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Количество пачек:</FormLabel>
                    <Input type="number" w={'100px'} id={field.name} name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur} onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                    <Box h={"30px"}><FieldInfo field={field} /></Box>
                  </FormControl>
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="badPacks"
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Количество плохих пачек:</FormLabel>
                    <Input type="number" w={'100px'} id={field.name} name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur} onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                    <Box h={"30px"}><FieldInfo field={field} /></Box>
                  </FormControl>
                </>
              )}
            />
          </div>

        </Flex> 

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" isLoading={!canSubmit} disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Сохранить'}
              </Button>
            </>
          )}
          />      
          </form>

      </Flex>
    </div>
  )
}

export default EditDetailsByBatchComponent;