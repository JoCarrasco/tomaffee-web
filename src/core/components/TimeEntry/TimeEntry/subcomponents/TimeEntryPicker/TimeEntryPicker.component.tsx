import React, { useRef, useState } from 'react';
import { DateHelper } from '../../../../../classes';
import { BasicFormComponent } from '../../../../Forms';
import { TimeEntryCalendar } from '../TimeEntryCalendar';
import { ITimeEntryCalendarHandle } from '../TimeEntryCalendar/TimeEntryCalendar.models';

interface ITimeEntryPickerProps {
  date: Date;
  onStopEdit?: (date: Date) => any;
}

export function TimeEntryPicker(props: ITimeEntryPickerProps) {
  const [value, setValue] = useState<Date>(props.date);
  const calendarComponent = useRef<ITimeEntryCalendarHandle>();

  function showCalendar() {
    calendarComponent?.current?.show();
  }

  function handleStopEdit(changedDateTimeValue: string | Date) {
    if (props.onStopEdit) {
      let change = new Date(value);
      if (typeof changedDateTimeValue === 'string') {
        change = DateHelper.toDateFromHourMinute12HourClock(
          new Date(value.getTime()),
          changedDateTimeValue,
        );
      } else {
        change = changedDateTimeValue;
      }
      setValue(change);
      props.onStopEdit(change);
    }
  }

  return (
    <>
      <BasicFormComponent
        onFocus={() => showCalendar()}
        initialValue={DateHelper.toHourMinute12HourClock(value)}
        onStopEdit={handleStopEdit}
      />
      <TimeEntryCalendar
        ref={calendarComponent}
        date={value}
        onStopEdit={handleStopEdit}
      />
    </>
  );
}
