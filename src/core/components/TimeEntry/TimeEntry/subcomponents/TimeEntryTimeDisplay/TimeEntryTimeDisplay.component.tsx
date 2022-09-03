import React, { useState } from 'react';
import { ITimeEntryNotNull } from '../../../../../models';
import { IDataHandler } from '../../../../../models/interfaces/time-entry';
import { TimeEntryDurationComponent } from '../TimeEntryDuration';
import { TimeEntryEditorComponent } from '../TimeEntryEditor';
import './TimeEntryTimeDisplay.style.scss';

interface ITimeEntryTimeDisplayComponentProps extends IDataHandler {
  start: Date;
  end: Date;
}

export function TimeEntryTimeDisplayComponent(
  props: ITimeEntryTimeDisplayComponentProps,
) {
  console.log(props.start, props.end);
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const DurationComponent = (
    <button onClick={() => setShowEditor((val) => !val)}>
      <TimeEntryDurationComponent start={props.start} end={props.end} />
    </button>
  );

  function handleChange(value: Partial<ITimeEntryNotNull>) {
    props.onValueChange(value);
    setShowEditor(false);
  }

  const DateTimePickerComponent = () => {
    return (
      <div className="time-entry-display-picker-wrapper">
        {DurationComponent}
        <TimeEntryEditorComponent
          start={props.start}
          end={props.end}
          showComponent={showEditor}
          onChange={handleChange}
        />
      </div>
    );
  };

  return <div className="time-entry-display">{DateTimePickerComponent()}</div>;
}
