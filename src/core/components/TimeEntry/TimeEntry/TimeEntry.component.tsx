import React, { useState } from 'react';
import { ITimeEntryComponentProps, ITimeEntryPropChange } from './TimeEntry.models';
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

  function handleTimeEntryChanges(change: ITimeEntryPropChange) {
    if (props.timeEntry[change.key] !== change.value) {
      props.onTimeEntryChange(props.timeEntry.id, {
        [change.key]: change.value,
      });
    }
  }

  const CheckBox = () => {
    if (!props.enableSelection) {
      return null;
    }
    return (
      <TimeEntryCheckboxComponent
        value={checked}
        onChange={handleSelectionChange}
      />
    );
  };

  return (
    <div className="time-entry-component-wrapper">
      <div
        className={`time-entry-default ${
          props.isActive ? 'time-entry-active' : ''
        }`}
      >
        <CheckBox />
        <TimeEntryFieldsWrapperComponent
          description={props.timeEntry.description}
          title={props.timeEntry.title}
          allowEdit={props.timeEntry.isEditable}
          onValueChange={(change) => handleTimeEntryChanges(change)}
        />
        <TimeEntryControlsComponent
          isActive={props.timeEntry.end === undefined}
          onClickContinue={() => props.onTimeEntryContinue(props.timeEntry.id)}
          onClickStop={() => props.onTimeEntryStop(props.timeEntry.id)}
          onClickRemove={() => props.onTimeEntryRemove(props.timeEntry.id)}
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
