import { FieldApi, useForm } from "@tanstack/react-form";
import { useBatchById, useUpdateBatch } from "../../../../services/hooks/useBatches";
import { useCreatePackagingBatchDetail } from "../../../../services/hooks/packaging-batch-detail-hook"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PackagingBatchDetailType } from "../../../../utils/types/types";
import { v4 as uuidv4 } from 'uuid';

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

const StartPackagingBatchFormComponent: React.FC<StartPackagingBatchFormComponentProps> = ({id: batchId, closeModal}) => {
  const {data: batch, isSuccess} = useBatchById(batchId);

  // const initPackagingBatchDetail: PackagingBatchDetailType = {
  //   dateAndtimeStart: undefined,
  //   id: uuidv4(),
  //   shift: undefined,
  //   dateAndtimeEnd: undefined,
  //   goodPacks: undefined,
  //   badPacks: undefined,
  //   packagingTimeInMInutes: undefined,
  // }

  const mutation = useCreatePackagingBatchDetail()
  


  const form = useForm({
    defaultValues: {
      date: '',
      time: '',
    },
    onSubmit: async ({ value }) => {
      const packagingBatchDetail: PackagingBatchDetailType = {
        dateAndtimeStart: new Date(`${value.date}T${value.time}`),
        batchId: batchId,
        shift: undefined,
        dateAndtimeEnd: undefined,
        goodPacks: 0,
        badPacks: 0,
        packagingTimeInMInutes: 0,
      }

      mutation.mutate({...packagingBatchDetail},

        {
          onSuccess: () => closeModal(),
          onError: (err) => console.log(err.message)
        }
      )

      // mutation.mutate(
      //   {
      //     ...batch,
      //     packagingBatch: {
      //       ...batch!.packagingBatch,
      //       packagingBatchDetails: [
      //         {
      //           ...detail
      //         }
      //       ]

      //     }

      //   },
      //   {
      //     onSuccess: () => closeModal()
      //   }
      // )
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
        name="date"
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
              <FormLabel htmlFor={field.name}>Дата начала:</FormLabel>
              <Input
                type="date"
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
    <div>
      <form.Field
        name="time"
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
              <FormLabel htmlFor={field.name}>Время начала:</FormLabel>
              <Input
                type="time"
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
