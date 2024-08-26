import { FieldApi, useForm } from "@tanstack/react-form";
import { LineCategoryEnum, LineData, LineSchemeType, PackagingSchemeType, PackagingTypeEnum, ProductData } from "../../../../utils/types/master-data-types";
import { useCreateLineData, useUpdateLineData } from "../../../../services/hooks/linesData";
import { Button, Checkbox, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { useCreateProductData, useUpdateProductData } from "../../../../services/hooks/productsData";

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

type ProductFormComponentProps = {
  isNew: boolean,
  onClose: () => void,
  product?: ProductData,
}

const ProductFormComponent: React.FC<ProductFormComponentProps> = ({isNew, onClose, product}:ProductFormComponentProps) => {
  const packagingTypes = Object.values(PackagingTypeEnum);
  const create = useCreateProductData();
  const update = useUpdateProductData();

  const handleSubmit = (productData: ProductData) => {
    const data = {...productData, lineCategory: productData.lineCategory.filter((item) => item !== '' as LineCategoryEnum)};

    if (isNew) {
      create.mutate(data,
        {
          onSuccess: () => {
            form.reset();
            onClose();
          } 
        }
      )
    } else {
      const submitData = Object.assign(product ? {...product} : {}, {...data})

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
        title: {
          ru: isNew ? '' : product?.title.ru,
          en: isNew ? '' : product?.title.en,
        },
        type: isNew ? '' as PackagingTypeEnum : product?.type,
        lineCategory:  isNew ? [] as LineCategoryEnum[] : product?.lineCategory,        
        lineScheme: isNew ? [] as LineSchemeType[] : product?.lineScheme,
      },
      onSubmit: async ({ value }) => {
        handleSubmit(value as ProductData);
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
              name="title.ru"
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
                    <FormLabel htmlFor={field.name}>Наименование РУ:</FormLabel>
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
              name="title.en"
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
                    <FormLabel htmlFor={field.name}>Наименование EN:</FormLabel>
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
              name="type"
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
                    <FormLabel htmlFor={field.name}>Тип:</FormLabel>
                    <RadioGroup defaultValue={product && product.type} onChange={(e) => field.handleChange(e as PackagingTypeEnum)}>
                      <Flex direction={"column"}>
                      {packagingTypes.map((type) => {
                        return(
                          <Radio key={type} id={type} value={type}>{type}</Radio>
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
            <form.Field name="lineCategory" mode="array">
              {(field) => {
                return (
                  <div>
                    {field.state.value!.map((_, i) => {
                      return (
                        <form.Field key={i} name={`lineCategory[${i}]`}>
                          {(subField) => {
                            return (
                              <div>
                                <label>
                                  <Input
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value as LineCategoryEnum)
                                    }
                                  />
                                </label>
                              </div>
                            )
                          }}
                        </form.Field>
                      )
                    })}
                    <button
                      onClick={() => field.pushValue('' as LineCategoryEnum)}
                      type="button"
                    >
                      Add person
                    </button>
                  </div>
                )
              }}
            </form.Field>
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

export default ProductFormComponent;