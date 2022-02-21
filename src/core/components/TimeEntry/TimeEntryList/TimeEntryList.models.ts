import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryListComponentProps {
  date: Date;
  entries: ITimeEntry[];
  now: Date;
  currentOngoingTimeEntryId?: number | null;
}
