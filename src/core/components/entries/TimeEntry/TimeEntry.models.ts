import { ITimeEntryFinished } from "../../../models";

export interface ITimeEntryComponentProps {
  timeEntry: ITimeEntryFinished;
  enableSelection?: boolean;
  onRemove: (id: string) => any;
  onContinue: (id: string) => any;
  onChange: (id: string, changes: Partial<ITimeEntryFinished>) => any;
  onUnselect?: (id: string) => void;
  onSelect?: (id: string) => void;
}
