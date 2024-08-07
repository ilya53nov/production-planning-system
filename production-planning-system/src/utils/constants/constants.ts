import { PackagingAvailabilityLossesType, PackagingBatchDetailType, PackagingBatchType, PackagingPerformanceLossesType, PackagingQualityLossesType, PackagingScheduledDowntimeType, PackagingStageType } from "../types/types";

export const BASE_URL = 'http://localhost:3123';


export interface NavItem {
  label: string;
  path: string;
}

export const initPackagingScheduledDowntimeType: PackagingScheduledDowntimeType = {
  notOrdersTimeInMinutes: 0,
  lunchOrBreakOrTrainingTimeInMinutes: 0,
  technicalMaintenanceTimeInMinutes: 0,
  otherTimeInMinutes: 0,
  batchId: '',
  id: '',
}

export const initPackagingQualityLossesType: PackagingQualityLossesType = {
  repackingTimeInMinutes: 0,
  batchId: '',
  id: '',
}

export const initPackagingPerformanceLossesType: PackagingPerformanceLossesType = {
  packagingMaterialTimeInMinutes: 0,
  semiFinishedProductTimeInMinutes: 0,
  lossSpeedTimeInMinutes: 0,
  replacementOfMaterialTimeInMinutes: 0,
  settingsDuringOperationTimeInMinutes: 0,
  shortStopsTimeInMinutes: 0,
  longStopsTimeInMinutes: 0,
  otherTimeInMinutes: 0,
  nonDistributedDowntimeInMinutes: 0,
  batchId: '',
  id: '',
}

export const initPackagingAvailabilityLosses: PackagingAvailabilityLossesType = {
  cleaningTimeInMinutes: 0,
  settingUpOrChangingFormatTimeInMinutes: 0,
  repairTimeInMinutes: 0,
  testsTimeInMinutes: 0,
  staffShortageTimeInMinutes: 0,
  waitingForMaterialTimeInMinutes: 0,
  calculatingMaterialBalanceTimeInMinutes: 0,
  manualAggregationTimeInMinutes: 0,
  otherTimeInMinutes: 0,
  batchId: '',
  id: '',
}

export const initPackagingBatchDetails: PackagingBatchDetailType = {
  badPacks: 0,
  dateAndtimeEnd: undefined,
  dateAndtimeStart: new Date(),
  goodPacks: 0,
  packagingAvailabilityLosses: [initPackagingAvailabilityLosses],
  packagingPerformanceLosses: [initPackagingPerformanceLossesType],
  packagingQualityLosses: [initPackagingQualityLossesType],
  packagingScheduledDowntime: [initPackagingScheduledDowntimeType],
  packagingTimeInMInutes: 0,
  shift: undefined,
  batchId: '',
  id: '',
}

export const initPackagingBatch: PackagingBatchType = {
  badPacks: 0,
  batchNumber: '',
  batchNumberSap: '',
  goodPacks: 0,
  id: '',
  isBatchCompletedSap: false,
  line: undefined,
  orderNumber: '',
  packagingBatchDetails: [initPackagingBatchDetails],
  product: {
    version: 1,
    gtin: '',
    title: {
      ru: '',
      en: ''
    }
  },
}


export const initialNewBatchState: PackagingStageType  = {
  id: '',
  packagingBatch: {
    packagingBatchDetails: [],
    line: undefined,
    product: {
      version: 1,
      gtin: '',
      title: {
        ru: '',
        en: ''
      }
    },
    batchNumber: '',
    orderNumber: '',
    goodPacks: 0,
    badPacks: 0,
    batchNumberSap: '',
    isBatchCompletedSap: false,
  },
  packagingLosses: {
    packagingAvailabilityLosses: {
      cleaningTimeInMinutes: 0,
      settingUpOrChangingFormatTimeInMinutes: 0,
      repairTimeInMinutes: 0,
      testsTimeInMinutes: 0,
      staffShortageTimeInMinutes: 0,
      waitingForMaterialTimeInMinutes: 0,
      calculatingMaterialBalanceTimeInMinutes: 0,
      manualAggregationTimeInMinutes: 0,
      otherTimeInMinutes: 0
    },
    packagingPerformanceLosses: {
      packagingMaterialTimeInMinutes: 0,
      semiFinishedProductTimeInMinutes: 0,
      lossSpeedTimeInMinutes: 0,
      replacementOfMaterialTimeInMinutes: 0,
      settingsDuringOperationTimeInMinutes: 0,
      shortStopsTimeInMinutes: 0,
      longStopsTimeInMinutes: 0,
      otherTimeInMinutes: 0,
      nonDistributedDowntimeInMinutes: 0
    },
    packagingQualityLosses: {
      repackingTimeInMinutes: 0
    },
    packagingScheduledDowntime: {
      notOrdersTimeInMinutes: 0,
      lunchOrBreakOrTrainingTimeInMinutes: 0,
      technicalMaintenanceTimeInMinutes: 0,
      otherTimeInMinutes: 0
    }
  }
}
