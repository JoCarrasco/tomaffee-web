import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isOnGoing: boolean;
  enableSelection?: boolean;
  now?: Date;
  onTimeEntryStop?: (...args: any[]) => any;
  onUnselectEntry?: (id: number) => void;
  onSelectEntry?: (id: number) => void;
}
