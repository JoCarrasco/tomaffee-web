import { ITimeEntry } from "../../../models/api";

export interface ITimeEntryEditorProps {
  show: boolean;
  timeEntryId: number;
  staticTimeEntry?: ITimeEntry;
  onEditionClosed: () => any;
  onEditionFinished: () => any;
}
