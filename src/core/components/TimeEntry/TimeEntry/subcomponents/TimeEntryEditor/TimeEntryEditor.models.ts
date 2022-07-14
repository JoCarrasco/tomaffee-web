import { ITimeEntry } from "../../../../../models/api";

export interface ITimeEntryEditorProps {
  show: boolean;
  timeEntryId: string;
  staticTimeEntry?: ITimeEntry;
  onEditionClosed: () => any;
  onEditionFinished: () => any;
}