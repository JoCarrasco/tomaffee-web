import React, { useState } from 'react';
import { ITimeEntryComponentProps } from './TimeEntry.models';
import { TimeEntryTimeDisplayComponent, TimeEntryControlsComponent, TimeEntryEditorComponent, TimeEntryCheckboxComponent, TimeEntryFieldsWrapperComponent } from './subcomponents';
import { useNow } from '../../../hooks';
import './TimeEntry.style.scss';

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const now = useNow();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  
  const handleSelectionChange = () => {
    if (props.onSelectEntry !== undefined && props.onUnselectEntry !== undefined) {
      const id = props.timeEntry.id;
      const newValue = !checked;
      newValue ? props.onSelectEntry(id) : props.onUnselectEntry(id);
      setChecked(!checked);
    }
  };

  const CheckBox = () => {
    if (!props.enableSelection) { return null; }
    return (
      <TimeEntryCheckboxComponent value={checked} onChange={handleSelectionChange}/>
    );
  }

  const TimeEntryEditor = () => {
    if (isEditing) {
      return (
        <TimeEntryEditorComponent
          show={true}
          timeEntryId={props.timeEntry.id}
          onEditionClosed={() => setIsEditing(false)}
          onEditionFinished={() => setIsEditing(false)} />
      );
    }

    return null;
  }
  
  return (
    <div className="time-entry-component-wrapper">
      <TimeEntryEditor />
      <div className={`time-entry-default ${props.isActive ? 'time-entry-active' : ''}`}>
        <CheckBox />
        <TimeEntryFieldsWrapperComponent description={props.timeEntry.description} title={props.timeEntry.title}/>
        <TimeEntryControlsComponent
          isActive={props.timeEntry.end === undefined}
          onClickContinue={() => props.onTimeEntryContinue(props.timeEntry.id)}
          onClickStop={() => props.onTimeEntryStop(props.timeEntry.id)}
          onClickRemove={() => props.onTimeEntryRemove(props.timeEntry.id)} />
        <TimeEntryTimeDisplayComponent start={props.timeEntry.start} end={props.timeEntry.end} now={now}/>
      </div>
    </div>
  );
};
