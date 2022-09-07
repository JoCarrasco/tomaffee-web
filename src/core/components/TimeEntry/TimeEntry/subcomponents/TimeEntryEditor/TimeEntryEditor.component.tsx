import React, { useState } from 'react';
import { DateHelper } from '../../../../../classes';
import { ITimeEntry } from '../../../../../models';
import { TimeEntryPicker } from '../TimeEntryPicker';
import Calendar from 'react-calendar';
import './TimeEntryEditor.style.scss';

interface ITimeEntryEditorComponentProps {
  start: Date;
  end: Date;
  showComponent: boolean;
  onChange: (change: Partial<ITimeEntry>) => any;
}

export const TimeEntryEditorComponent = (
  props: ITimeEntryEditorComponentProps,
) => {
  const [value, onChange] = useState([props.start, props.end]);

  function onTimeChange(newValue: Date, propName: 'start' | 'end') {
    // const updatedDate = value;
    onChange((prevState) => {
      let [start, end] = prevState;
      const dicDate = { start, end };
      const overridenValue = DateHelper.assignDateTimeToDate(
        newValue,
        dicDate[propName],
      );

      if (propName === 'start') {
        start = overridenValue;
      } else {
        end = overridenValue;
      }

      return [start, end];
    });
  }

  function onDateChange(newValue: Date) {
    onChange((prevState) => {
      prevState[0] = DateHelper.assignFullDateToDate(newValue, prevState[0]);
      prevState[1] = DateHelper.assignFullDateToDate(newValue, prevState[1]);
      return prevState;
    });
  }

  function submitChanges() {
    props.onChange({
      start: value[0],
      end: value[1],
    });
  }

  function onValidateStart(dateTimeStart: Date): boolean {
    let isValid = true;
    const dateStart = DateHelper.assignDateTimeToDate(dateTimeStart, value[0]);
    if (dateStart > value[1]) {
      isValid = false;
    }

    return isValid;
  }

  function onValidateEnd(dateTimeEnd: Date): boolean {
    let isValid = true;
    const dateEnd = DateHelper.assignDateTimeToDate(dateTimeEnd, value[1]);
    if (dateEnd < value[0]) {
      isValid = false;
    }

    return isValid;
  }

  if (props.showComponent) {
    return (
      <div className="time-entry-editor-outer-wrapper">
        <div className="time-entry-editor-inner-wrapper">
          <TimeEntryPicker
            date={props.start}
            onValidation={onValidateStart}
            onStopEdit={(newStart) => onTimeChange(newStart, 'start')}
          />
          <TimeEntryPicker
            date={props.end}
            onValidation={onValidateEnd}
            onStopEdit={(newEnd) => onTimeChange(newEnd, 'end')}
          />
        </div>
        <div className="time-entry-editor-calendar-wrapper">
          <Calendar onChange={onDateChange} value={value[0]} />
        </div>
        <div>
          <button onClick={submitChanges}>Save</button>
        </div>
      </div>
    );
  }

  return null;
};
