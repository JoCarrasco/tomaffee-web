import React from "react";
import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isActive: boolean;
  enableSelection?: boolean;
  onTimeEntryStop: (id: string) => any;
  onTimeEntryRemove: (id: string) => any;
  onTimeEntryContinue: (id: string) => any;
  onTimeEntryChange: (id: string, changes: Partial<ITimeEntry>) => any;
  onUnselectEntry?: (id: string) => void;
  onSelectEntry?: (id: string) => void;
}

export interface ITimeEntryPropChange {
  key: keyof ITimeEntry;
  value: any;
}
