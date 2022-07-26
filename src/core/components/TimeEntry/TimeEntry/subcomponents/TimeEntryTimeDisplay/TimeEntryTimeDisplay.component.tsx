import React from 'react';
import { useNow } from '../../../../../hooks';
import { IBasicDataHandler } from '../../../../../models/interfaces/time-entry';
import { TimeEntryDurationComponent } from '../TimeEntryDuration';
import { TimeEntryPicker } from '../TimeEntryPicker';

interface ITimeEntryTimeDisplayComponentProps extends IBasicDataHandler {
  start: Date;
  end: Date | undefined;
}

export function TimeEntryTimeDisplayComponent(
  props: ITimeEntryTimeDisplayComponentProps,
) {
  const end = useNow(props.end);
  const DurationComponent = (
    <TimeEntryDurationComponent start={props.start} end={end} />
  );

  const TimeDisplay = props.end ? DateTimePickerComponent() : DurationComponent;

  function handleStopEdit(value: Date, propName: 'start' | 'end') {
    props.onValueChange({ key: propName, value });
  }

  function DateTimePickerComponent() {
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
        {DurationComponent}
      </div>
    );
  }

  return <div className="time-entry-display">{TimeDisplay}</div>;
}
