import React from 'react';
import { DateHelper } from '../../../../../classes';
import { useNow } from '../../../../../hooks';
import { ITimeEntry } from '../../../../../models/api';
import { BasicFormComponent } from '../../../../Forms/BasicForm/BasicForm.component';
import { ITimeEntryPropChange } from '../../TimeEntry.models';

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
    val: string,
    propName: keyof ITimeEntryTimeDisplayComponentProps,
  ) {
    if (props.end !== undefined) {
      const updatedDate = DateHelper.toDateFromHourMinute12HourClock(
        new Date((props[propName] as Date).getTime()),
        val,
      );
      props.onValueChange({
        key: propName as keyof ITimeEntry,
        value: updatedDate,
      });
    }
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
        <BasicFormComponent
          initialValue={DateHelper.toHourMinute12HourClock(props.start)}
          onStopEdit={(val) => handleStopEdit(val, 'start')}
        />
        <BasicFormComponent
          initialValue={DateHelper.toHourMinute12HourClock(end)}
          onStopEdit={(val) => handleStopEdit(val, 'end')}
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
