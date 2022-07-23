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
      return new Date();
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
