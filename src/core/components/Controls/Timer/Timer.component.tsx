import { useState } from 'react';
import { useNow } from '../../../hooks';
import { ITimeEntry } from '../../../models';
import { BasicFormComponent } from '../../Forms';
import { TimeEntryDurationComponent } from '../../TimeEntry';
import './Timer.component.style.scss';

interface IControlTimerComponentProps {
  activeTimeEntry?: ITimeEntry;
  onPause: (id: string) => void;
  onChange: (id: string, change: Partial<ITimeEntry>) => void;
  onStart: (optionalTitle?: string) => void;
}

export const ControlTimerComponent = (props: IControlTimerComponentProps) => {
  const now = useNow();
  const [title, setTitle] = useState<string>(
    props.activeTimeEntry ? props.activeTimeEntry.title : 'Add new description',
  );

  function onStopTitleEdit(val: string) {
    setTitle(val);
    if (props.activeTimeEntry !== undefined) {
      props.onChange(props.activeTimeEntry.id, { title: val });
    }
  }

  function handleStart() {
    props.onStart(title);
  }

  function handlePause() {
    if (props.activeTimeEntry) {
      props.onPause(props.activeTimeEntry.id);
      setTitle('Add new description');
    }
  }

  const ActionButton = () => {
    if (props.activeTimeEntry) {
      return <button onClick={handlePause}>Pause Entry</button>;
    } else {
      return <button onClick={handleStart}>Start New Entry</button>;
    }
  };

  const Duration = () => {
    if (props.activeTimeEntry) {
      return (
        <TimeEntryDurationComponent
          start={props.activeTimeEntry.start}
          end={now}
        />
      );
    }
    return (
      <>
        <p>00:00</p>
      </>
    );
  };

  return (
    <div className="timer-control-wrapper">
      <BasicFormComponent initialValue={title} onStopEdit={onStopTitleEdit} />
      <div className="time-entry-duration-wrapper">{Duration()}</div>

      {ActionButton()}
    </div>
  );
};
