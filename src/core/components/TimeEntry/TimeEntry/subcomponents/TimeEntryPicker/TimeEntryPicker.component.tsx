import React, { useRef, useState } from 'react';
import { DateHelper } from '../../../../../classes';
import { BasicFormComponent } from '../../../../Forms';
import { TimeEntryCalendar } from './subcomponents/TimeEntryCalendar';
import { ITimeEntryCalendarHandle } from './subcomponents/TimeEntryCalendar/TimeEntryCalendar.models';

interface ITimeEntryPickerProps {
  date: Date;
  onStopEdit?: (date: Date) => any;
}

export function TimeEntryPicker(props: ITimeEntryPickerProps) {
  const [value, setValue] = useState<Date>(props.date);
  const calendarComponent = useRef<ITimeEntryCalendarHandle>(null);

  function showCalendar() {
    calendarComponent?.current?.show();
  }

  function handleStopEdit(changedDateTimeValue: string | Date) {
    if (props.onStopEdit) {
      const change =
        typeof changedDateTimeValue === 'string'
          ? DateHelper.assignTimeToDate(value, changedDateTimeValue)
          : changedDateTimeValue;

      props.onStopEdit(change);
      setValue(change);
    }
  }

  return (
    <div>
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
    </div>
  );
}
