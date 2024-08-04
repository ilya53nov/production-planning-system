import { PackagingStageType } from "../types/types";

export interface NavItem {
  label: string;
  path: string;
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
