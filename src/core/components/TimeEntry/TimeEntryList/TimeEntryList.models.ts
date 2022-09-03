import { ITimeEntryNotNull } from "../../../models";

export interface ITimeEntryListComponentProps {
  forcedActiveTimeEntryId?: string;
  entries: ITimeEntryNotNull[];
  onRemove: (id: string) => any; 
  onContinue: (id: string) => any;
  onStop: (id: string) => any;
  onValueChange: (id:string, change: Partial<ITimeEntryNotNull>) => any;
}
