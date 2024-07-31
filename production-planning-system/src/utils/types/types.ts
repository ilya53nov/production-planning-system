export type PackagingBatchType = {
  date: Date,
  line: Line,
  shift: Shift,
  product: ProductType,
  batchNumber: String,
  orderNumber: String,
  timeStart: Date,
  timeEnd: Date,
  goodPacks: Number,
  badPacks: Number,
  batchNumberSap: String,
  isBatchCompletedSap: Boolean,
}


export type PackagingStageType = {
  packagingBatch: PackagingBatchType,
  packagingLosses: PackagingLossesType,
}

export type PackagingLossesType = {
  packagingAvailabilityLosses: PackagingAvailabilityLossesType,
  packagingPerformanceLosses: PackagingPerformanceLossesType,
  packagingQualityLosses: PackagingQualityLossesType,
  packagingScheduledDowntime: PackagingScheduledDowntimeType,
}

export type PackagingAvailabilityLossesType = {
  cleaningTimeInMinutes: Number,
  settingUpOrChangingFormatTimeInMinutes: Number,
  repairTimeInMinutes: Number,
  testsTimeInMinutes: Number,
  staffShortageTimeInMinutes: Number,
  waitingForMaterialTimeInMinutes: Number,
  calculatingMaterialBalanceTimeInMinutes: Number,
  manualAggregationTimeInMinutes: Number,
  otherTimeInMinutes: Number,
}

export type PackagingPerformanceLossesType = {
  packagingMaterialTimeInMinutes: Number,
  semiFinishedProductTimeInMinutes: Number,
  lossSpeedTimeInMinutes: Number,
  replacementOfMaterialTimeInMinutes: Number,
  settingsDuringOperationTimeInMinutes: Number,
  shortStopsTimeInMinutes: Number,
  longStopsTimeInMinutes: Number,
  otherTimeInMinutes: Number,
  nonDistributedDowntimeInMinutes: Number,
}

export type PackagingQualityLossesType = {
  repackingTimeInMinutes: Number,
}

export type PackagingScheduledDowntimeType = {
 notOrdersTimeInMinutes: Number,
 lunchOrBreakOrTrainingTimeInMinutes: Number,
 technicalMaintenanceTimeInMinutes: Number,
 otherTimeInMinutes: Number,
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
  version: Number,
  gtin: String,
  title: {
    ru: String,
    en: String,
  },
}