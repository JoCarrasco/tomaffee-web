import React, { useState } from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry } from '../../../models/api';
import { TimeEntryPickerComponent, TimeEntryPickerOutput } from '../TimeEntryPicker/TimeEntryPicker.component';

interface ITimeEntryEditorFormComponentProps {
  staticTimeEntry: ITimeEntry;
  onFinishEditing: (editedValues: ITimeEntryEditorEditedValue[] | null) => void;
}

export interface ITimeEntryEditorEditedValue {
  key: string;
  value: any;
}

export const TimeEntryEditorFormComponent = (props: ITimeEntryEditorFormComponentProps) => {
  const defaultDescription = props.staticTimeEntry.description ? props.staticTimeEntry.description : '';
  const defaultEndDate = props.staticTimeEntry.end ? props.staticTimeEntry.end : DateHelper.getNow();

  const [title, setTitle] = useState<string>(props.staticTimeEntry.title);
  const [description, setDescription] = useState<string>(defaultDescription);
  const [startDate, setStartDate] = useState<Date>(props.staticTimeEntry.start);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  function handleChange(e: any, setter: (params: any) => any) {
    setter(e.target.value);
  }

  function getTitleInput() {
    return (<div className="form-group">
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} />
    </div>);
  }

  function handleTimeEntryPickerChange(e: TimeEntryPickerOutput) {
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
    // Original TimeEntry
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
