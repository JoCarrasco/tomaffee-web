import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './TimeEntryCalendar.styles.scss';

interface ITimeEntryCalendarProps {
  date?: Date;
  onStopEdit?: (date: Date) => any;
}

export const TimeEntryCalendar = forwardRef(
  (props: ITimeEntryCalendarProps, ref) => {
    const dateInput = React.createRef<HTMLInputElement>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>(
      props.date ? props.date.toISOString() : new Date().toISOString(),
    );

    useImperativeHandle(ref, () => ({
      show: () => {
        setIsVisible(true);
        dateInput.current?.click();
      },
    }));

    function parseDateStrToDate(dateStr: string): Date {
      const cloneDate = new Date(
        props.date ? props.date.getTime() : new Date(),
      );
      if (props.date) {
        const year = parseInt(dateStr.slice(0, 4), 10);
        const month = parseInt(dateStr.slice(5, 7), 10);
        const day = parseInt(dateStr.slice(8, 10), 10);
        cloneDate.setFullYear(year, month, day);
      }
      return cloneDate;
    }

    function handleStopEdit() {
      if (props.onStopEdit) {
        props.onStopEdit(parseDateStrToDate(value));
      }
    }

    return (
      <input
        type="date"
        className={'time-entry-calendar' + (isVisible ? ' active' : '')}
        ref={dateInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleStopEdit}
      />
    );
  },
);
