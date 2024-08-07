import { FieldApi, useForm } from "@tanstack/react-form";
import { useCreateBatch } from "../../../../services/hooks/useBatches";

import { useGetMasterData } from "../../../../services/hooks/masterData";

import { initialNewBatchState, initPackagingBatch } from "../../../../utils/constants/constants";
import { Line, LinesData } from "../../../../utils/types/types";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useGetLinesData } from "../../../../services/hooks/linesData";


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


const CreateNewBatchFormComponent: React.FC<LinesData> = (line?: LinesData) => {
  const {data: masterData, isSuccess} = useGetMasterData();
  const {data: lines, isSuccess: isSuccessLines} = useGetLinesData();



  const mutation = useCreateBatch();
  
    const form = useForm({
      defaultValues: {
        productTitle: 'Выберите из списка',
        orderNumber: '',
        batchNumber: '',
        batchNumberSap: '',
        line: line ? line.line : 'Выберите из списка',
      },
      onSubmit: async ({ value }) => {
        const productMasterData = masterData!.filter((item) => item.id === value.productTitle)[0]

        console.log(value)

        mutation.mutate(
          {
            ...initPackagingBatch,            
                product: productMasterData,
                orderNumber: value.orderNumber,
                batchNumber: value.batchNumber,
                batchNumberSap: value.batchNumberSap,
                line: value.line as Line,
          },
          {
            onSuccess: () => form.reset()
          }
        )
      },
    })

  if (isSuccess && isSuccessLines) {

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
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Наименование препарата:</FormLabel>
                    <Select w={'300px'}
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
                    </Select>
                    <FieldInfo field={field} />
                  </FormControl>
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
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Номер заказа:</FormLabel>
                    <Input w={'300px'}
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
                  <Input w={'300px'}
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
                  <Input w={'300px'}
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
                  <Select w={'300px'}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    >
                    {lines.map((item, index) => {
                      return(
                        <option key={item.line+index} value={item.line}>{item.line}</option>
                      )
                    })}
                  </Select>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button type="submit" isLoading={!canSubmit} disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Создать новый заказ'}
                </Button>
              </>
            )}
          />
        </form>
      </div>
    )
  }

}

export default CreateNewBatchFormComponent;