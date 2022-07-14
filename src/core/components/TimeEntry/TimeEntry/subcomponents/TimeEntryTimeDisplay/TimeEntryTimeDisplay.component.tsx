import React from 'react';
import { DateHelper } from '../../../../../classes';
import { useNow } from '../../../../../hooks';
import { BasicFormComponent } from '../../../../Forms/BasicForm/BasicForm.component';
import { ITimeEntryPropChange } from '../../TimeEntry.models';

interface ITimeEntryTimeDisplayComponentProps {
  start: Date;
  end: Date | undefined;
  onValueChange: (change: ITimeEntryPropChange) => any;
}

export function TimeEntryTimeDisplayComponent(
  props: ITimeEntryTimeDisplayComponentProps,
) {
  const now = useNow();

  function handleStopEdit(val: string, isStart: boolean) {
    // Note: Uncomment when string date parser is ready.
    // props.onValueChange({ key: isStart ? 'start' : 'end', value: val });
  }

  function renderHoursAndMinutes() {
    return (
      <p>
        {DateHelper.toDurationAsClock(props.start, props.end ? props.end : now)}
      </p>
    );
  }

  function renderForm() {
    if (props.end !== undefined) {
      return (
        <div>
          <BasicFormComponent
            initialValue={DateHelper.parseToStrOfHoursAndMinutes(props.start)}
            onStopEdit={(val) => handleStopEdit(val, true)}
          />
          <BasicFormComponent
            initialValue={DateHelper.parseToStrOfHoursAndMinutes(props.end)}
            onStopEdit={(val) => handleStopEdit(val, false)}
          />
        </div>
      );
    }

    return null;
  }

  function renderTimeDisplay() {
    return props.end === undefined ? renderHoursAndMinutes() : renderForm();
  }

  return (
    <div className="time-entry-display">
      <div>{renderTimeDisplay()}</div>
    </div>
  );
}
