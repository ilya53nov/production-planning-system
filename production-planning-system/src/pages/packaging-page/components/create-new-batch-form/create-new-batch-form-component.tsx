import { FieldApi, useForm } from "@tanstack/react-form";
import { useCreateBatch } from "../../../../services/hooks/useBatches";

import { useGetMasterData } from "../../../../services/hooks/masterData";

import { initialNewBatchState } from "../../../../utils/constants/constants";
import { Line } from "../../../../utils/types/types";


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


const CreateNewBatchFormComponent: React.FC = () => {
  const {data: masterData, isSuccess, isLoading} = useGetMasterData();
  const lines = ['IMA 1', 'IMA 2', 'IMA 3', 'MA100', 'Deckert'];

  lines.unshift('Выберите из списка')

  const mutation = useCreateBatch();
  
    const form = useForm({
      defaultValues: {
        productTitle: 'Выберите из списка',
        orderNumber: '',
        batchNumber: '',
        batchNumberSap: '',
        line: 'Выберите из списка',
      },
      onSubmit: async ({ value }) => {
        const productMasterData = masterData!.filter((item) => item.id === value.productTitle)[0]

        console.log(value)

        mutation.mutate(
          {
            ...initialNewBatchState,
            packagingBatch: {
              ...initialNewBatchState.packagingBatch,
                product: productMasterData,
                orderNumber: value.orderNumber,
                batchNumber: value.batchNumber,
                batchNumberSap: value.batchNumberSap,
                line: value.line as Line ,
            },

          },
          {
            onSuccess: () => form.reset()
          }
        )
      },
    })

  if (isSuccess) {

    return (
      <div>
        <h1>Simple Form Example</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >     
          <div>
            <form.Field
              name="productTitle"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : value === 'Выберите из списка'
                      ? 'Необходимо выбрать из списка'
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') && 'No "error" allowed in productTitle'
                  )
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Наименование препарата:</label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option key={0} value={'Выберите из списка'}>{'Выберите из списка'}</option>
                    {masterData.map((item) => {
                      return(
                        <option key={item.id} value={item.id}>{item.title.ru}</option>
                      )
                    })}
                  </select>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
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
                    value.includes('error') && 'No "error" allowed in orderNumber'
                  )
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Номер заказа:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="batchNumber"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') && 'No "error" allowed in batchNumber'
                  )
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Номер серии:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="batchNumberSap"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') && 'No "error" allowed in batchNumberSap'
                  )
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Контрорльный номер ГП в SAP:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="line"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : value === 'Выберите из списка'
                      ? 'Необходимо выбрать из списка'
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') && 'No "error" allowed in line'
                  )
                },
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Упаковочная линия:</label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    >
                    {lines.map((item, index) => {
                      return(
                        <option key={item+index} value={item}>{item}</option>
                      )
                    })}
                  </select>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Создать новый заказ'}
                </button>
              </>
            )}
          />
        </form>
      </div>
    )
  }

}

export default CreateNewBatchFormComponent;