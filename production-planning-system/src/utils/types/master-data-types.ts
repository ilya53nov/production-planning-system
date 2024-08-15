export enum LineCategoryEnum {
  primaryPackaging = 'Первичная упаковка',
  secondaryPackaging = 'Вторичная упаковка',
  primaryAndSecondaryPackaging = 'Первичная + вторичная упаковка',
}

export enum PackagingTypeEnum {
  blister = 'Блистер',
  bottle ='Флакон',
}

export type LinesData = {
  id?: string,
  title: string,
  category: LineCategoryEnum,
  type: PackagingTypeEnum[],
}