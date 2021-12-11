import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import  TimePicker from 'react-time-picker/dist/entry.nostyle'; 
import './TimeEntryPicker.style.scss';

interface TimeEntryPickerComponentProps {
  start: Date;
  end?: Date;
  canEdit: boolean;
  onStartEdit?: (...args: any[]) => any
}

export const TimeEntryPickerComponent = (props: TimeEntryPickerComponentProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  function canEdit() {
    const inheritValue = props.canEdit;
    if (inheritValue !== undefined) {
      return inheritValue;
    } else {
      return true;
    }
  }

  function startEdit() {
    if (canEdit()) {
      setIsEditing(true);
      return props.onStartEdit ? props.onStartEdit() : null;
    }
  }

  function getNonInteractiveDisplay() {
    return (
      <div className="time-entry-picker-default" onClick={() => { startEdit() }}>
        <p>{DateHelper.getDurationFromStartAndEnd(props.start, props.end)}</p>
      </div>
    );
  }

  function getInteractiveDisplay() {
    return (
      <div className="time-entry-picker-modal">
        <div className="time-entry-picker-grid">
          <div>
            <TimePicker value={props.start}/>
          </div>
        </div>
      </div>
    );
  }

  function getDatePicker() {
    return isEditing ? getInteractiveDisplay() : getNonInteractiveDisplay();
  }

  return (
    <div>
      {getDatePicker()}
    </div>
  );
}
