import React from 'react';
import { useNow } from '../../../../../hooks';
import { ITimeEntryPropChange } from '../../TimeEntry.models';
import { TimeEntryDurationComponent } from '../TimeEntryDuration';
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
  const end = props.end ? props.end : now;
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
