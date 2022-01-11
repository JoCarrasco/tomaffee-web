import React, { useState } from 'react';
import { DateHelper } from '../../../classes';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimeEntryPicker.style.scss';

interface TimeEntryPickerComponentProps {
  start: Date;
  end?: Date;
  onChange: (output: TimeEntryPickerOutput) => any
};

export interface TimeEntryPickerOutput {
  start: Date;
  end?: Date;
}

export const TimeEntryPickerComponent = (props: TimeEntryPickerComponentProps) => {
  const [dateEndIsUndefined, setDateEndIsUndefined] = useState<boolean>(props.end === undefined);
  const defaultEnd = props.end === undefined ? DateHelper.getNow().asDate : props.end;
  const defaultEndTime = DateHelper.parseToStrOfHoursAndMinutes(defaultEnd);
  const defaultStartTime = DateHelper.parseToStrOfHoursAndMinutes(props.start);

  const [start, setStart] = useState(props.start);
  const [startDate, setStartDate] = useState(props.start);
  const [startTime, setStartTime] = useState<string>(defaultStartTime);

  const [end, setEnd] = useState(defaultEnd);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [endTime, setEndTime] = useState<string>(defaultEndTime);

  function setEndNow() {
    setDateEndIsUndefined(false);
    setEndDate(DateHelper.getNow().asDate);
    onPickerClosed();
  }

  function onPickerClosed() {
    if (props.onChange === undefined) { return false; }
    const arrOfTimeChanges: any[] = [ { time: startTime, ref: start, date: startDate } ];

    if (dateEndIsUndefined === false) {
      arrOfTimeChanges[1] = { time: endTime, ref: end, date: endDate };
    }

    const arrOfFormattedChanges = arrOfTimeChanges.map((change) => {
      const timeFormated = parseTimePickerToDate(change.time, change.ref);
      const dateFormatted = DateHelper.assignDate(timeFormated, change.date);
      return dateFormatted;
    });

    props.onChange({
      start: arrOfFormattedChanges[0],
      end: arrOfFormattedChanges[1] || undefined
    });
  }

  function parseTimePickerToDate(dateInTime: string, date: Date): Date {
    const hour = parseInt(dateInTime.substr(0, 2), 10);
    const minute = throwZeroIfIsInvalid(parseInt(dateInTime.substr(3, 5), 10));
    const second = throwZeroIfIsInvalid(parseInt(dateInTime.substr(6, 7), 10));
    return DateHelper.assignDate({ hour, minute, second }, date);
  }

  function throwZeroIfIsInvalid(val: any) {
    if (isNaN(val)) { return 0; }
    return val;
  }

  function onStartDateChange(e: any, isStart: boolean) {
    isStart ? setStartDate(e) : setEndDate(e);
  }

  function getEndInput() {
    if (dateEndIsUndefined) {
      return (
        <div className="edit-end-advice">
          <span>Still running, do you want to stop?</span>
          <button onClick={() => setEndNow()}>Stop Timer</button>
        </div>
      );
    } else {
      return (
        <div>
          <label>End</label>
          <DatePicker selected={endDate} onChange={(date) => onStartDateChange(date as Date, false)} />
          <TimePicker value={endTime} maxDetail="second" onClockClose={() => onPickerClosed()} onChange={setEndTime} format="HH:mm:ss"/>
        </div>
      );
    }
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
          {getEndInput()}
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
