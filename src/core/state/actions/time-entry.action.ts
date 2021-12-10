import { ITimeEntryPrimitive } from "../../models/api";

export interface ITimeEntryAction {
  type: TimeEntryActionType;
  payload: ITimeEntryActionPayload;
}

export interface ITimeEntryActionPayload {
  id: number;
  chunk?: ITimeEntryPrimitive;
}

export enum TimeEntryActionType {
  Add = 'ADD_TIME_ENTRY',
  Remove = 'REMOVE_TIME_ENTRY',
  Update = 'UPDATE_TIME_ENTRY'
}

export const addTimeEntry = (chunk: ITimeEntryPrimitive) => ({
  type: TimeEntryActionType.Add,
  chunk
});

export const removeTimeEntry = (timeEntryId: number) => ({
  type: TimeEntryActionType.Remove,
  timeEntryId
});

export const updateTimeEntry = (timeEntryId: number, updatedChunk: ITimeEntryPrimitive) => ({
  type: TimeEntryActionType.Update,
  timeEntryId,
  updatedChunk
});
