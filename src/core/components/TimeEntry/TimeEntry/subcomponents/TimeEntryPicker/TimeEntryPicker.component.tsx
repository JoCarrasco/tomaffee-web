import React, { useState } from 'react';
import { DateHelper, DateHelperFormatRegex } from '../../../../../classes';
import { BasicFormComponent } from '../../../../Forms';
import './TimeEntryPicker.style.scss';

interface ITimeEntryPickerProps {
  date: Date;
  onStopEdit?: (date: Date) => any;
  onValidation?: (dateTime: Date) => boolean;
}

export function TimeEntryPicker(props: ITimeEntryPickerProps) {
  const [value, setValue] = useState<Date>(props.date);

  function handleStopEdit(timeStr: string) {
    if (props.onStopEdit) {
      const change = DateHelper.timeStrToDate(timeStr, props.date);
      props.onStopEdit(change);
      setValue(change);
    }
  }

  function formatStrOnEveryChange(val: string): string {
    let finalVal = val.toUpperCase();
    return finalVal;
  }

  function parentValidation(val: string, isValid: boolean): boolean {
    if (props.onValidation) {
      isValid = props.onValidation(DateHelper.timeStrToDate(val, props.date));
    }

    return isValid;
  }

  function forceValidationOnEveryChange(val: string): boolean {
    let isValid = true;

    if (
      !DateHelperFormatRegex.TwelveHourClockHourMinute.test(val) ||
      val.length < 8 ||
      !parentValidation(val, isValid)
    ) {
      isValid = false;
    }

    return isValid;
  }

  return (
    <div className="time-entry-picker-wrapper">
      <BasicFormComponent
        initialValue={DateHelper.toHourMinute12HourClock(value)}
        onValidation={forceValidationOnEveryChange}
        onFormat={formatStrOnEveryChange}
        onStopEdit={handleStopEdit}
      />
    </div>
  );
}
