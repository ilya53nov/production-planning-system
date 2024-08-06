import { FieldApi, useForm } from "@tanstack/react-form";
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

type StartPackagingBatchFormComponentProps = {
  id: string,
  closeModal: () => void,
}

const StartPackagingBatchFormComponent: React.FC<StartPackagingBatchFormComponentProps> = ({id, closeModal}) => {
  const {data: batch, isSuccess} = useBatchById(id);
  const mutation = useUpdateBatch();


  const form = useForm({
    defaultValues: {
      dateAndtimeStart: '',
    },
    onSubmit: async ({ value }) => {
      //const productMasterData = masterData!.filter((item) => item.id === value.productTitle)[0]

      //console.log(value) packagingBatchDetails

      mutation.mutate(
        {
          ...batch,
          packagingBatch: {
            ...batch.packagingBatch,
            packagingBatchDetails: [
              {
                dateAndtimeStart: value.dateAndtimeStart
              }
            ]

          }

        },
        {
          onSuccess: () => closeModal()
        }
      )
    },
  })

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
        name="dateAndtimeStart"
        validators={{
          onChange: ({ value }) =>
            !value
              ? 'Обязательное поле'
              : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return (
              value.includes('error') && 'No "error" allowed in orderNumber'
            )
          },
        }}
        children={(field) => (
          <>
            <FormControl>
              <FormLabel htmlFor={field.name}>Дата и время начала:</FormLabel>
              <Input
                type="datetime-local"
                w={'300px'}
                id={field.name}
                name={field.name}
                value={field.state.value}
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

export default StartPackagingBatchFormComponent;