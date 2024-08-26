export enum LineCategoryEnum {
  primaryPackaging = 'Первичная упаковка',
  secondaryPackaging = 'Вторичная упаковка',
  primaryAndSecondaryPackaging = 'Первичная + вторичная упаковка',
}

export enum PackagingTypeEnum {
  blister = 'Блистер',
  bottle ='Флакон',
}

export type LineData = {
  id?: string,
  title: string,
  number: number,
  category: LineCategoryEnum,
  type: PackagingTypeEnum[],
}

export type ProductData = {
  id?: string,
  title: {
    ru: string,
    en: string,
  },
  type: PackagingTypeEnum,
  lineCategory: LineCategoryEnum[],
  lineScheme: LineSchemeType[],
  // packagingScheme: PackagingSchemeType[],
  // line: LineData[],
}

export type LineSchemeType = {
  line: LineData,
  packagingScheme: PackagingSchemeType,
}

export type PrimaryAndSecondaryPackagingSchemeType = {
  tabletsPerUnit: number,
  speed: number,
  primaryUnitPerConsumerPackaging: number,
  consumerPackagingPerBatch: number,
  consumerPackagingPerBox: number,
  boxesPerPallet: number,
}

export type PrimaryPackagingSchemeType = {
  tabletsPerUnit: number,
  speed: number,
}

export type SecondaryPackagingSchemeType = {
  primaryUnitPerConsumerPackaging: number,
  consumerPackagingPerBatch: number,
  consumerPackagingPerBox: number,
  boxesPerPallet: number,
  speed: number,
}

export type PackagingSchemeType = PrimaryPackagingSchemeType | SecondaryPackagingSchemeType | PrimaryAndSecondaryPackagingSchemeType;