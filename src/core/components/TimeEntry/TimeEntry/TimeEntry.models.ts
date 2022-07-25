import { ITimeEntry } from "../../../models";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isActive: boolean;
  enableSelection?: boolean;
  onStop: (id: string) => any;
  onRemove: (id: string) => any;
  onContinue: (id: string) => any;
  onChange: (id: string, changes: Partial<ITimeEntry>) => any;
  onUnselect?: (id: string) => void;
  onSelect?: (id: string) => void;
}
