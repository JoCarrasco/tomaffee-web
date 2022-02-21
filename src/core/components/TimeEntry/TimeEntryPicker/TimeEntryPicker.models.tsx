export interface ITimeEntryPickerComponentProps {
  start: Date;
  end?: Date;
  onChange: (output: ITimeEntryPickerOutput) => any
};

export interface ITimeEntryPickerOutput {
  start: Date;
  end?: Date;
}
