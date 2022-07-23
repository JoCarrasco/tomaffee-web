import React from 'react';
import { DateHelper } from '../../../../../classes';
import { useNow } from '../../../../../hooks';
import { ITimeEntry } from '../../../../../models/api';
import { ITimeEntryPropChange } from '../../TimeEntry.models';
import { TimeEntryPicker } from '../TimeEntryPicker';

interface ITimeEntryTimeDisplayComponentProps {
  start: Date;
  end: Date | undefined;
  onValueChange: (change: ITimeEntryPropChange) => any;
}

export function TimeEntryTimeDisplayComponent(
  props: ITimeEntryTimeDisplayComponentProps,
) {
  const now = useNow();

  function handleStopEdit(
    value: Date,
    propName: keyof ITimeEntryTimeDisplayComponentProps,
  ) {
    props.onValueChange({
      key: propName as keyof ITimeEntry,
      value,
    });
  }

  function renderHoursAndMinutes() {
    return (
      <p>
        {DateHelper.toDurationAsClock(props.start, props.end ? props.end : now)}
      </p>
    );
  }

  function renderForm() {
    const end = props.end === undefined ? now : props.end;

    return (
      <div>
        <TimeEntryPicker
          date={props.start}
          onStopEdit={(newStart) => handleStopEdit(newStart, 'start')}
        />
        <TimeEntryPicker
          date={end}
          onStopEdit={(newEnd) => handleStopEdit(newEnd, 'end')}
        />
        <p>{DateHelper.toDurationAsClock(props.start, end)}</p>
      </div>
    );
  }

  function renderTimeDisplay() {
    return props.end === undefined ? renderHoursAndMinutes() : renderForm();
  }

  return (
    <div className="time-entry-display">
      <div>{renderTimeDisplay()}</div>
    </div>
  );
}
