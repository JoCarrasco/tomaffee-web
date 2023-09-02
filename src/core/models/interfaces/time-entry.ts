import { ITimeEntry, ITimeEntryFinished } from "../entities";

export interface IDataObj {
  key: keyof ITimeEntry;
  value: any;
}

export interface IBasicDataHandler {
  onValueChange: (obj: IDataObj) => any;
}

export interface IDataHandler {
  onValueChange: (obj: Partial<ITimeEntryFinished>) => any
}

export interface IIdDataHandler {
  onValueChange: (id:string, obj: IDataObj) => any;
}
