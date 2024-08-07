import { FieldApi, useForm } from "@tanstack/react-form"
import { useBatchById, useUpdateBatch } from "../../../../services/hooks/useBatches";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

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

export type EditBatchFormComponentProps = {
  id: string
}

const EditBatchFormComponent: React.FC<EditBatchFormComponentProps> = ({id}) => {
  const {data: batch, isSuccess, isLoading} = useBatchById(id);
  const mutation = useUpdateBatch();




  const form = useForm({
    defaultValues: {
      orderNumber: isSuccess ? batch.orderNumber : '',
    },
    onSubmit: async ({ value }) => {
      //const productMasterData = masterData!.filter((item) => item.id === value.productTitle)[0]

      //console.log(value)

      mutation.mutate(
        {
          ...batch,
              orderNumber: value.orderNumber,
        },
        {
          //onSuccess: () => form.reset()
        }
      )
    },
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isSuccess) {
    return(
    <div>
    <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >     
    <div>
      <form.Field
        name="orderNumber"
        validators={{
          onChange: ({ value }) =>
            !value
              ? 'Обязательное поле'
              : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return (
              value!.includes('error') && 'No "error" allowed in orderNumber'
            )
          },
        }}
        children={(field) => (
          <>
            <FormControl>
              <FormLabel htmlFor={field.name}>Номер заказа:</FormLabel>
              <Input
                w={'300px'}
                id={field.name}
                name={field.name}
                value={field.state.value || ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </FormControl>
          </>
        )}
      />
    </div>
    <form.Subscribe
    selector={(state) => [state.canSubmit, state.isSubmitting]}
    children={([canSubmit, isSubmitting]) => (
      <>
        <Button type="submit" isLoading={!canSubmit} disabled={!canSubmit}>
          {isSubmitting ? '...' : 'Редактировать'}
        </Button>
      </>
    )}
    />
    </form>
    </div>
    )
    
  }
}

export default EditBatchFormComponent;