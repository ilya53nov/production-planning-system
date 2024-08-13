import { FieldApi, useForm } from "@tanstack/react-form";
import { PackagingBatchDetailType, Shift } from "../../../../utils/types/types";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

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

const EditDetailsByBatchComponent: React.FC<PackagingBatchDetailType> = (props: PackagingBatchDetailType) => {
  const {id, dateAndtimeStart, shift, goodPacks} = props;

  const form = useForm({
    defaultValues: {
      dateAndtimeStart: new Date(dateAndtimeStart).toLocaleDateString(),
      shift: shift,
    },
    // onSubmit: async ({ value }) => {
    //   const packagingBatchDetail: PackagingBatchDetailType = {
    //     dateAndtimeStart: new Date(value.dateAndtimeStart),
    //     batchId: batchId,
    //     shift: undefined,
    //     dateAndtimeEnd: undefined,
    //     goodPacks: 0,
    //     badPacks: 0,
    //     packagingTimeInMInutes: 0,
    //   }

    //   mutation.mutate({...packagingBatchDetail},

    //     {
    //       onSuccess: () => closeModal(),
    //       onError: (err) => console.log(err.message)
    //     }
    //   )
    // },
  })

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
                value={field.state.value || new Date().toLocaleDateString()}
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
        name="shift"
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
              <FormLabel htmlFor={field.name}>Смена:</FormLabel>
              <Select w={'300px'}
                id={field.name}
                name={field.name}
                value={field.state.value || ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option key={0} value={'Выберите из списка'}>{'Выберите из списка'}</option>
                {['1', '2'].map((item) => {
                  return(
                    <option key={item} value={item}>{item}</option>
                  )
                })}
              </Select>
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

export default EditDetailsByBatchComponent;