import { Dayjs } from "dayjs";

export type TDateObject = typeof Dayjs.prototype;

export interface IDateHelperDateOutput {
  asDate: Date;
  asObject: TDateObject;
}

export interface IDateHelperSimpleDateObj {
  date: number;
  month: number;
  year: number;
}

export interface IDateHelperSimpleTimeObj {
  hour: number;
  minute: number;
  second: number;
}
