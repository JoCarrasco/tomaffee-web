import { ITimeEntry, ITimeEntryFinished } from "../../../models";

export interface ITimeEntryListComponentProps {
  forcedActiveTimeEntryId?: string;
  entries: ITimeEntry[];
  onRemove: (id: string) => any; 
  onContinue: (id: string) => any;
  onValueChange: (id:string, change: Partial<ITimeEntryFinished>) => any;
}
