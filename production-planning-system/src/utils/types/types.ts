export type PackagingBatchType = {
  id?: string,
  line?: Line | undefined,
  product?: ProductType | undefined,
  batchNumber?: string,
  orderNumber?: string,
  goodPacks?: number,
  badPacks?: number,
  batchNumberSap?: string,
  isBatchCompletedSap?: boolean,
  packagingBatchDetails?: PackagingBatchDetailType[],
}

export type PackagingBatchDetailType = {
  id?: string,
  batchId?: string,
  dateAndtimeStart: Date,
  shift?: Shift | undefined,
  dateAndtimeEnd?: Date | undefined,
  goodPacks?: number,
  badPacks?: number,
  packagingTimeInMInutes?: number,
  packagingAvailabilityLosses?: PackagingAvailabilityLossesType[],
  packagingPerformanceLosses?: PackagingPerformanceLossesType[],
  packagingQualityLosses?: PackagingQualityLossesType[],
  packagingScheduledDowntime?: PackagingScheduledDowntimeType[],
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
  id?: string,
  batchId?: string,
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
  id?: string,
  batchId?: string,
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
  id?: string,
  batchId?: string,
  repackingTimeInMinutes: number,
}

export type PackagingScheduledDowntimeType = {
  id?: string,
  batchId?: string,
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