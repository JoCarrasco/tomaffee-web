import { useState } from "react";
import { ITimeEntryPropChange } from "../..";

interface ITimeEntryFieldsWrapperComponent {
  title: string;
  description?: string;
  allowEdit: boolean;
  onValueChange: (obj: ITimeEntryPropChange) => any
}

export const TimeEntryFieldsWrapperComponent = (props: ITimeEntryFieldsWrapperComponent) => {
  return (
    <div className="time-entry-text-info-wrapper">
      <TimeEntryFieldTitle title={props.title}
        onValueChange={(val) => props.onValueChange({ key: 'title', value: val })}
        allowEdit={props.allowEdit}
      />
      <TimeEntryFieldDescription description={props.description}/>
    </div>
  );
}

const TimeEntryFieldDescription = (props: { description?: string }) => {
  return (
    props.description !== undefined
      ?
      <p className="time-entry-text-description">
        {props.description}
      </p>
      : null
  );
}

const TimeEntryFieldTitle = (props: { title?: string, allowEdit: boolean, onValueChange: (val: string) => any }) => {
  const title = props.title === '' || props.title === undefined ? 'Add a title' : props.title;
  const [isEditing, setIsEditing] = useState(false);
  
  function handleStopEdit(val: string) {
    setIsEditing(false);
    props.onValueChange(val);
  }

  return isEditing && props.allowEdit ? <TimeEntryFieldTitleInput initialValue={title} onStopEdit={handleStopEdit} /> : <p onClick={() => setIsEditing(true)}>{title}</p>
}

const TimeEntryFieldTitleInput = (props: { initialValue: string; onStopEdit: (val: string) => any  }) => {
  const [val, setVal] = useState(props.initialValue);

  return (
    <input type='text' value={val} onBlur={() => props.onStopEdit(val)} onChange={(e) => setVal(e.target.value)} autoFocus />
  )
}
