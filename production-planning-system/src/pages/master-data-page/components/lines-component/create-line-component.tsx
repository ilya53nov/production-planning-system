import { FieldApi, useForm } from "@tanstack/react-form";
import { LineCategoryEnum, LinesData, PackagingTypeEnum } from "../../../../utils/types/master-data-types";
import { useCreateLineData } from "../../../../services/hooks/linesData";
import { Button, Checkbox, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";

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


const CreateNewLineFormComponent: React.FC = () => {
  const lineCategories = Object.values(LineCategoryEnum);
  const mutation = useCreateLineData();
  
    const form = useForm({
      defaultValues: {
        title: '',
        isBlister: false,
        isBottle: false,
        category: '' as LineCategoryEnum,
      },
      onSubmit: async ({ value }) => {    
        const typeItems: PackagingTypeEnum[] = [];

        if (value.isBlister) {
          typeItems.push(PackagingTypeEnum.blister)
        }

        if (value.isBottle) {
          typeItems.push(PackagingTypeEnum.bottle)
        }
        
        const lineData: LinesData= {
          category: value.category,
          title: value.title,
          type: typeItems,
        }   

        mutation.mutate(
          {
            ...lineData
          },
          {
            onSuccess: () => form.reset()
          }
        )
      },
    })

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
              name="category"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Категория:</FormLabel>

                    <RadioGroup onChange={(e) => field.handleChange(e as LineCategoryEnum)}>
                      <Flex direction={"column"}>
                      {lineCategories.map((category) => {
                        return(
                          <Radio key={category} id={category} value={category}>{category}</Radio>
                        )
                      })}
                      </Flex>                   
                    </RadioGroup>
                    
                    <FieldInfo field={field} />
                  </FormControl>
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Обязательное поле'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <FormControl>
                    <FormLabel htmlFor={field.name}>Наименование:</FormLabel>
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
              name="isBlister"
              validators={{
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Блистер ?:</label>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}             
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="isBottle"
              validators={{
                onChangeAsyncDebounceMs: 500,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Флакон ?:</label>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}             
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
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
                  {isSubmitting ? '...' : 'Создать'}
                </Button>
              </>
            )}
          />
        </form>
      </div>
    )
  

}

export default CreateNewLineFormComponent;