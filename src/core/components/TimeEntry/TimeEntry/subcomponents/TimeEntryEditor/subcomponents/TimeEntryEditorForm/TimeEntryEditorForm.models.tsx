import { ITimeEntry } from "../../../../../../../models/api";

export interface ITimeEntryEditorFormComponentProps {
  staticTimeEntry: ITimeEntry;
  onFinishEditing: (editedValues: ITimeEntryEditorEditedValue[] | null) => void;
}

export interface ITimeEntryEditorEditedValue {
  key: string;
  value: any;
}
