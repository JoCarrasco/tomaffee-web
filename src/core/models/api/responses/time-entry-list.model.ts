import { ITimeEntry } from "../entities";

export interface ITimeEntryList {
  date: Date;
  entries: ITimeEntry[];
};
