import { FieldApi, useForm } from "@tanstack/react-form";
import { LineCategoryEnum, LinesData, PackagingTypeEnum } from "../../../../utils/types/master-data-types";
import { useCreateLineData, useUpdateLineData } from "../../../../services/hooks/linesData";
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

type LineFormComponentProps = {
  isNew: boolean,
  onClose: () => void,
  line?: LinesData,
}

const LineFormComponent: React.FC<LineFormComponentProps> = ({isNew, onClose, line}:LineFormComponentProps) => {
  const lineCategories = Object.values(LineCategoryEnum);
  const create = useCreateLineData();
  const update = useUpdateLineData();

  const handleSubmit = (lineData: LinesData) => {
    if (isNew) {
      create.mutate({...lineData},
        {
          onSuccess: () => {
            form.reset();
            onClose();
          } 
        }
      )
    } else {
      const submitData = Object.assign(line ? {...line} : {}, {...lineData})

      update.mutate({data: submitData, id: submitData.id!},
        {
          onSuccess: () => {
            form.reset();
            onClose();
          } 
        }
      )
    }

  }
  
    const form = useForm({
      defaultValues: {
        title: isNew ? '' : line?.title,
        isBlister: isNew ? false : line && line?.type.filter((type) => type === PackagingTypeEnum.blister).length > 0,
        isBottle: isNew ? false : line && line?.type.filter((type) => type === PackagingTypeEnum.bottle).length > 0,
        category: isNew ? '' as LineCategoryEnum : line?.category,
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
          category: value.category as LineCategoryEnum,
          title: value.title as string,
          type: typeItems,
        }

        

        handleSubmit(lineData);

        // if (isNew) {
        //   create.mutate({...lineData},
        //     {
        //       onSuccess: () => {
        //         form.reset();
        //         onClose();
        //       } 
        //     }
        //   )
        // }
        
        // if (!isNew) {
        //   update.mutate({...lineData},
        //     {
        //       onSuccess: () => {
        //         form.reset();
        //         onClose();
        //       } 
        //     }
        //   )
        // }

      },
    })

    return (
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

                    <RadioGroup defaultValue={line && line.category} onChange={(e) => field.handleChange(e as LineCategoryEnum)}>
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
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    isChecked={field.state.value}  
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
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    isChecked={field.state.value}      
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
                  {isSubmitting ? '...' :  isNew ? 'Добавить данные' : 'Сохранить'}
                </Button>
              </>
            )}
          />
        </form>
      </div>
    )
  

}

export default LineFormComponent;