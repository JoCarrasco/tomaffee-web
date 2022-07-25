import { ITimeEntry } from "../../../models";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isActive: boolean;
  enableSelection?: boolean;
  onStop: (id: string) => any;
  onRemove: (id: string) => any;
  onContinue: (id: string) => any;
  onTimeEntryChange: (id: string, changes: Partial<ITimeEntry>) => any;
  onUnselectEntry?: (id: string) => void;
  onSelectEntry?: (id: string) => void;
}
