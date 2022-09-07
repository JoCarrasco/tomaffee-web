import { ITimeEntry, ITimeEntryNotNull } from "../../../models";

export interface ITimeEntryListComponentProps {
  forcedActiveTimeEntryId?: string;
  entries: ITimeEntry[];
  onRemove: (id: string) => any; 
  onContinue: (id: string) => any;
  onStop: (id: string) => any;
  onValueChange: (id:string, change: Partial<ITimeEntryNotNull>) => any;
}
