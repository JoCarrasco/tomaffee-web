import { ITimeEntryNotNull } from "../../../models";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntryNotNull;
  enableSelection?: boolean;
  onRemove: (id: string) => any;
  onContinue: (id: string) => any;
  onChange: (id: string, changes: Partial<ITimeEntryNotNull>) => any;
  onUnselect?: (id: string) => void;
  onSelect?: (id: string) => void;
}
