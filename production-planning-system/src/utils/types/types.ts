export type BatchType = {
  date: Date,
  line: Line,
  shift: Shift,
  product: Product,
  batchNumber: String,
  orderNumber: String,
  timeStart: Date,
  timeEnd: Date,
  goodPacks: Number,
  badPacks: Number,
  
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