import { ITimeEntry } from "../entities";

export interface IDataObj {
  key: keyof ITimeEntry;
  value: any;
}

export interface IBasicDataHandler {
  onValueChange: (obj: IDataObj) => any;
}

export interface IIdDataHandler {
  onValueChange: (id:string, obj: IDataObj) => any;
}
