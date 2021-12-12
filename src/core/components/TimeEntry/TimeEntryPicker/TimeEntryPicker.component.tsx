import React, { useState } from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './TimeEntryPicker.style.scss';

interface TimeEntryPickerComponentProps {
  start: Date;
  end?: Date;
  onChange: (output: TimeEntryPickerOutput) => any
};

export interface TimeEntryPickerOutput {
  start: Date;
  end: Date;
}

export const TimeEntryPickerComponent = (props: TimeEntryPickerComponentProps) => {
  const defaultEnd = props.end === undefined ? DateHelper.getNow() : props.end;
  const defaultEndTime = DateHelper.parseToStrOfHoursAndMinutes(defaultEnd);
  const defaultStartTime = DateHelper.parseToStrOfHoursAndMinutes(props.start);

  const [start, setStart] = useState(props.start);
  const [startDate, setStartDate] = useState(props.start);
  const [startTime, setStartTime] = useState<string>(defaultStartTime);

  const [end, setEnd] = useState(defaultEnd);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [endTime, setEndTime] = useState<string>(defaultEndTime);

  function onPickerClosed() {
    if (props.onChange !== undefined) {
      const arrOfTimeChanges: any[] = [
        { time: startTime, ref: start, date: startDate },
        { time: endTime, ref: end, date: endDate }
      ];

      const arrOfFormattedChanges = arrOfTimeChanges.map((change) => {
        const timeFormmated = parseTimePickerToDate(change.time, change.ref);
        const dateFormatted = DateHelper.changeReplaceFullDateToDate(timeFormmated, change.date);
        return dateFormatted;
      });

      props.onChange({
        start: arrOfFormattedChanges[0],
        end: arrOfFormattedChanges[1]
      });
    }
  }

  function parseTimePickerToDate(output: string, date: Date) {
    const hour = parseInt(output.substr(0, 2), 10);
    const minute = throwZeroIfIsInvalid(parseInt(output.substr(3, 5), 10));
    const second = throwZeroIfIsInvalid(parseInt(output.substr(6, 7), 10));
    const modifiedDate = DateHelper.changeTimeToDate(hour, minute, second, date);
    return modifiedDate;
  }

  function throwZeroIfIsInvalid(val: any) {
    if (isNaN(val)) { return 0; }
    return val;
  }

  function onStartDateChange(e: any, isStart: boolean) {
    isStart ? setStartDate(e) : setEndDate(e);
  }

  function getInteractiveDisplay() {
    return (  
      <div className="time-entry-picker-modal">
        <div className="time-entry-picker-grid">
          <div>
            <label>Start</label>
            <DatePicker selected={startDate} onChange={(date) => onStartDateChange(date as Date, true)} />
            <TimePicker value={startTime} maxDetail="second" onClockClose={() => onPickerClosed()} onChange={setStartTime} format="HH:m:s"/>
          </div>
          <div>
            <label>End</label>
            <DatePicker selected={endDate} onChange={(date) => onStartDateChange(date as Date, false)} />
            <TimePicker value={endTime} maxDetail="second" onClockClose={() => onPickerClosed()} onChange={setEndTime} format="HH:mm:ss"/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {getInteractiveDisplay()}
    </div>
  );
}
