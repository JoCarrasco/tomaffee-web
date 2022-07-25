import React, { useState } from 'react';
import { IDataObj } from '../../../models';
import { ITimeEntryComponentProps } from './TimeEntry.models';
import {
  TimeEntryTimeDisplayComponent,
  TimeEntryControlsComponent,
  TimeEntryCheckboxComponent,
  TimeEntryFieldsWrapperComponent,
} from './subcomponents';
import './TimeEntry.style.scss';

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleSelectionChange = () => {
    if (props.onSelect !== undefined && props.onUnselect !== undefined) {
      const id = props.timeEntry.id;
      const newValue = !checked;
      newValue ? props.onSelect(id) : props.onUnselect(id);
      setChecked(!checked);
    }
  };

  function handleChange(change: IDataObj) {
    if (props.timeEntry[change.key] !== change.value) {
      props.onChange(props.timeEntry.id, {
        [change.key]: change.value,
      });
    }
  }

  const CheckBox = !props.enableSelection ? null : (
    <TimeEntryCheckboxComponent
      value={checked}
      onValueChange={handleSelectionChange}
    />
  );

  return (
    <div className="time-entry-component-wrapper">
      <div
        className={`time-entry-default ${
          props.isActive ? 'time-entry-active' : ''
        }`}
      >
        {CheckBox}
        <TimeEntryFieldsWrapperComponent
          {...props?.timeEntry}
          onValueChange={(change) => handleChange(change)}
        />
        <TimeEntryControlsComponent
          isActive={props.timeEntry.end === undefined}
          onContinue={() => props.onContinue(props.timeEntry.id)}
          onStop={() => props.onStop(props.timeEntry.id)}
          onRemove={() => props.onRemove(props.timeEntry.id)}
        />
        <TimeEntryTimeDisplayComponent
          start={props.timeEntry.start}
          end={props.timeEntry.end}
          onValueChange={(change) => handleChange(change)}
        />
      </div>
    </div>
  );
};
