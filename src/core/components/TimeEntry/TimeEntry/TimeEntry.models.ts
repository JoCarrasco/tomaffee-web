import React from "react";
import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isActive: boolean;
  enableSelection?: boolean;
  onTimeEntryStop: (id: string) => any;
  onTimeEntryRemove: (id: string) => any;
  onTimeEntryContinue: (id: string) => any;
  onUnselectEntry?: (id: string) => void;
  onSelectEntry?: (id: string) => void;
}
