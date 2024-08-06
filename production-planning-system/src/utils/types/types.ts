export type PackagingBatchType = {
  line?: Line | undefined,
  packagingBatchDetails?: PackagingBatchDetailType[],
  product?: ProductType | undefined,
  batchNumber?: string | undefined,
  orderNumber?: string | undefined,
  goodPacks?: number | undefined,
  badPacks?: number | undefined,
  batchNumberSap?: string | undefined,
  isBatchCompletedSap?: boolean | undefined,
}

export type PackagingBatchDetailType = {
  id?: string | undefined,
  dateAndtimeStart?: Date | undefined,
  shift?: Shift | undefined,
  dateAndtimeEnd?: Date | undefined,
  goodPacks?: number | undefined,
  badPacks?: number | undefined,
  packagingTimeInMInutes?: number | undefined,
}


export type PackagingStageType = {
  id?: string | undefined,
  packagingBatch?: PackagingBatchType,
  packagingLosses?: PackagingLossesType,
}

export type PackagingLossesType = {
  packagingAvailabilityLosses: PackagingAvailabilityLossesType,
  packagingPerformanceLosses: PackagingPerformanceLossesType,
  packagingQualityLosses: PackagingQualityLossesType,
  packagingScheduledDowntime: PackagingScheduledDowntimeType,
}

export type PackagingAvailabilityLossesType = {
  cleaningTimeInMinutes: number,
  settingUpOrChangingFormatTimeInMinutes: number,
  repairTimeInMinutes: number,
  testsTimeInMinutes: number,
  staffShortageTimeInMinutes: number,
  waitingForMaterialTimeInMinutes: number,
  calculatingMaterialBalanceTimeInMinutes: number,
  manualAggregationTimeInMinutes: number,
  otherTimeInMinutes: number,
}

export type PackagingPerformanceLossesType = {
  packagingMaterialTimeInMinutes: number,
  semiFinishedProductTimeInMinutes: number,
  lossSpeedTimeInMinutes: number,
  replacementOfMaterialTimeInMinutes: number,
  settingsDuringOperationTimeInMinutes: number,
  shortStopsTimeInMinutes: number,
  longStopsTimeInMinutes: number,
  otherTimeInMinutes: number,
  nonDistributedDowntimeInMinutes: number,
}

export type PackagingQualityLossesType = {
  repackingTimeInMinutes: number,
}

export type PackagingScheduledDowntimeType = {
 notOrdersTimeInMinutes: number,
 lunchOrBreakOrTrainingTimeInMinutes: number,
 technicalMaintenanceTimeInMinutes: number,
 otherTimeInMinutes: number,
}


export enum Line {
  Ima1 = 'IMA 1',
  Ima2 = 'IMA 2',
  Ima3 = 'IMA 3',
  Deckert = 'Deckert',
  Ma100 = 'MA100',
}

export enum Shift {
  Morning = 1,
  Day = 2,
  Night = 3,
}

export enum Product {
  Siofor1000 = 'Сиофор 1000',
  Mezum80 = 'Мезим 80',
}

export type ProductType = {
  version: number,
  gtin: string,
  title: {
    ru: string,
    en: string,
  },
}

export type MasterData = {
  id: string,
  version: number,
  gtin: string,
  title: {
    ru: string,
    en: string,
  },
}

export type LinesData = {
  line: string;
}