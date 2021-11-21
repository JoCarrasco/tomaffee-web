import { ITimeEntry } from "../../models/api";

export interface ITimeEntryAction {
  type: string;
}

export interface ITimeEntryActionAdd extends ITimeEntryAction {
  title: string;
}

export interface ITimeEntryActionRemove  extends ITimeEntryAction {
  timeEntryId: number;
}

export interface ITimeEntryActionUpdate  extends ITimeEntryAction {
  updatedTimeEntry: ITimeEntry;
}

export type TTimeEntryAction = ITimeEntryAction & ITimeEntryActionAdd & ITimeEntryActionRemove & ITimeEntryActionUpdate;

export enum TimeEntryActionType {
  Add = 'ADD_TIME_ENTRY',
  Remove = 'REMOVE_TIME_ENTRY',
  Update = 'UPDATE_TIME_ENTRY'
}

export const addTimeEntry = (title: string = '') => ({
  type: TimeEntryActionType.Add,
  title
});

export const removeTimeEntry = (timeEntryId: number) => ({
  type: TimeEntryActionType.Remove,
  timeEntryId
});

export const updateTimeEntry = (updatedTimeEntry: ITimeEntry) => ({
  type: TimeEntryActionType.Update,
  updatedTimeEntry
});
