import React, { useState } from 'react';
import { TimeEntryPickerComponent } from '../../../TimeEntryPicker/TimeEntryPicker.component';
import { ITimeEntryPickerOutput } from '../../../TimeEntryPicker/TimeEntryPicker.models';
import { ITimeEntryEditorEditedValue, ITimeEntryEditorFormComponentProps } from './TimeEntryEditorForm.models';

export const TimeEntryEditorFormComponent = (props: ITimeEntryEditorFormComponentProps) => {
  const [title, setTitle] = useState<string>(props.staticTimeEntry.title);
  const [description, setDescription] = useState<string>( props.staticTimeEntry.description ? props.staticTimeEntry.description : '');
  const [startDate, setStartDate] = useState<Date>(props.staticTimeEntry.start);
  const [endDate, setEndDate] = useState<Date | undefined>(props.staticTimeEntry.end);

  function handleChange(e: any, setter: (params: any) => any) {
    setter(e.target.value);
  }

  function getTitleInput() {
    return (<div className="form-group">
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} />
    </div>);
  }

  function handleTimeEntryPickerChange(e: ITimeEntryPickerOutput) {
    if (e) {
      setStartDate(e.start);
      setEndDate(e.end);
    }
  }

  function getDescriptionInput() {    
    return (
      <div className="form-group">
        <label>Description</label>
        <input type="text" onChange={(e) => handleChange(e, setDescription)}  value={description} />
      </div>
    );
  }

  function handleTimeEntryRemoval() {
    props.onFinishEditing(null);
  }

  function handleSubmitForm(e: any) {
    e.preventDefault();
    const t = props.staticTimeEntry;
    const editedValues: ITimeEntryEditorEditedValue[] = [];
    if (title !== t.title) {  editedValues.push({ key: 'title', value: title }); }
    if (description !== t.description) { editedValues.push({ key: 'description', value: description }); }
    if (startDate !== t.start) {editedValues.push({ key: 'start', value: startDate })}
    if (endDate !== t.end) { editedValues.push({ key: 'end', value: endDate }) }
    
    props.onFinishEditing(editedValues);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      {getTitleInput()}
      {getDescriptionInput()}
      <TimeEntryPickerComponent start={startDate} end={endDate} onChange={handleTimeEntryPickerChange}/>
      <button className="btn-save" type="submit">Save</button>
      <button className="btn-save" onClick={() => handleTimeEntryRemoval()}>Delete time entry</button>
    </form>
  );
}
