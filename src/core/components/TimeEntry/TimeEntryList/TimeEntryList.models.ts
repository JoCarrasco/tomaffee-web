import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryListComponentProps {
  forcedActiveTimeEntryId?: string;
  entries: ITimeEntry[];
  onRemove: (id: string) => any; 
  onContinue: (id: string) => any;
  onStop: (id: string) => any;
  onChange: (id:string, change: Partial<ITimeEntry>) => any;
}
