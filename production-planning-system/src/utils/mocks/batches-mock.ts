import { Line, PackagingStageType, Shift } from "../types/types";

export const packagingBatchesMock: PackagingStageType[] = [
  {
    id: 'fdgfdgfd',
    packagingBatch: {
      date: new Date(),
      line: Line.Ima1,
      shift: Shift.Morning,
      product: {
        version: 1,
        gtin: '32432212433',
        title: {
          ru: 'Сиофор 1000',
          en: 'Siofor 1000'
        }
      },
      batchNumber: '0320724',
      orderNumber: '1024401',
      timeStart: new Date(),
      timeEnd: new Date(),
      goodPacks: 6928,
      badPacks: 34,
      batchNumberSap: '12PHG',
      isBatchCompletedSap: false,
    },
    packagingLosses: {
      packagingAvailabilityLosses: {
        cleaningTimeInMinutes: 10,
        settingUpOrChangingFormatTimeInMinutes: 15,
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
]
