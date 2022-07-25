import React, { useState } from 'react';
import { ITimeEntryComponentProps } from './TimeEntry.models';
import {
  TimeEntryTimeDisplayComponent,
  TimeEntryControlsComponent,
  TimeEntryCheckboxComponent,
  TimeEntryFieldsWrapperComponent,
} from './subcomponents';
import './TimeEntry.style.scss';
import { IDataObj } from '../../../models';

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleSelectionValueChange = () => {
    if (
      props.onSelectEntry !== undefined &&
      props.onUnselectEntry !== undefined
    ) {
      const id = props.timeEntry.id;
      const newValue = !checked;
      newValue ? props.onSelectEntry(id) : props.onUnselectEntry(id);
      setChecked(!checked);
    }
  };

  function handleTimeEntryChanges(change: IDataObj) {
    if (props.timeEntry[change.key] !== change.value) {
      props.onTimeEntryChange(props.timeEntry.id, {
        [change.key]: change.value,
      });
    }
  }

  const CheckBox = !props.enableSelection ? null : (
    <TimeEntryCheckboxComponent
      value={checked}
      onValueChange={handleSelectionValueChange}
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
          onValueChange={(change) => handleTimeEntryChanges(change)}
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
          onValueChange={(change) => handleTimeEntryChanges(change)}
        />
      </div>
    </div>
  );
};
