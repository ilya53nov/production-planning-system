import { BatchType, Line, Product, Shift } from "../types/types";

export const batchesMock: BatchType[] = [
  {
    date: new Date(),
    line: Line.Ima1,
    shift: Shift.Morning,
    product: Product.Siofor1000,
    batchNumber: '0320724',
    orderNumber: '1024401',
    timeStart: new Date(),
    timeEnd: new Date(),
    goodPacks: 6928,
    badPacks: 34,
  }
]