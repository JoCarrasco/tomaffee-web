import React, { useState } from 'react';
import { ITimeEntry } from '../../../models/api';

interface ITimeEntryEditorFormComponentProps {
  staticTimeEntry: ITimeEntry;
  onFinishEditing: (editedValues: ITimeEntryEditorEditedValue[]) => void;
}

export interface ITimeEntryEditorEditedValue {
  key: string;
  value: any;
}

export const TimeEntryEditorFormComponent = (props: ITimeEntryEditorFormComponentProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  React.useEffect(() => {
    if (title === '') {setTitle(props.staticTimeEntry.title)}
    if (description === '') {setDescription(props.staticTimeEntry.description ? props.staticTimeEntry.description : '')}
  }, []);

  function handleChange(e: any, setter: (params: any) => any) {
    setter(e.target.value);
  }

  function getTitleInput() {
    return (<div className="form-group">
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} />
    </div>);
  }

  function getDescriptionInput() {    
    return (
      <div className="form-group">
        <label>Description</label>
        <input type="text" onChange={(e) => handleChange(e, setDescription)}  value={description} />
      </div>
    );
  }

  function handleSubmitForm(e: any) {
    e.preventDefault();
    // Original TimeEntry
    const t = props.staticTimeEntry;
    const editedValues: ITimeEntryEditorEditedValue[] = [];
    if (title !== t.title) {  editedValues.push({ key: 'title', value: title }); }
    if (description !== t.description) { editedValues.push({ key: 'description', value: description }); }
    props.onFinishEditing(editedValues);
    // resetForm();
  }

  function resetForm() {
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmitForm}>
      {getTitleInput()}
      {getDescriptionInput()}
      <button className="btn-save" type="submit">Save</button>
    </form>
  );
}
