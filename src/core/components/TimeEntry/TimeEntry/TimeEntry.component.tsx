import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle, faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimerService } from '../../..';
import { TimeEntryEditorComponent } from '../TimeEntryEditor/TimeEntryEditor.component';
import { DateHelper } from '../../../classes';
import { ITimeEntry } from '../../../models/api';
import './TimeEntry.style.scss';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isOnGoing: boolean;
  enableSelection?: boolean;
  now?: Date;
  onTimeEntryStop?: (...args: any[]) => any;
  onUnselectEntry?: (id: number) => void;
  onSelectEntry?: (id: number) => void;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  
  const handleSelectionChange = () => {
    if (props.onSelectEntry !== undefined && props.onUnselectEntry !== undefined) {
      const id = props.timeEntry.id;
      const newValue = !checked;
      newValue ? props.onSelectEntry(id) : props.onUnselectEntry(id);
      setChecked(!checked);
    }
  };

  async function stopTimeEntrySession() {
    await TimerService.stop();
    if (props.onTimeEntryStop) {
      props.onTimeEntryStop(props.timeEntry.id);
    }
  }

  const checkbox = () => {
    if (!props.enableSelection) { return null; }
    return (
      <TimeEntryCheckbox value={checked} onChange={handleSelectionChange}/>
    );
  }
  
  return (
    <div className="time-entry-component-wrapper">
      <TimeEntryEditorComponent show={isEditing} timeEntryId={props.timeEntry.id}
        onEditionClosed={() => setIsEditing(false)}
        onEditionFinished={() => setIsEditing(false)}/>
      <div className={`time-entry-default ${props.isOnGoing ? 'time-entry-active' : ''}`}>
        {checkbox()}
        <div className="time-entry-text-info-wrapper">
          <p>{props.timeEntry.title === '' ? 'Add a title' : props.timeEntry.title}</p>
          {
            props.timeEntry.description !== undefined ?
            <p className="time-entry-text-description">
              {props.timeEntry.description}
            </p> : null
          }
        </div>
        <div className="time-entry-icon-wrapper">
          <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/></i>
          {
            props.isOnGoing ?
            <i className="time-entry-stop-icon" onClick={() => stopTimeEntrySession()}>
              <FontAwesomeIcon icon={faStopCircle} />
            </i> :
            <i className="time-entry-start-icon" onClick={() => TimerService.start()}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </i>
          }
          <i className="time-entry-remove-icon"><FontAwesomeIcon icon={faTrashAlt} onClick={() => TimeEntryService.removeTimeEntry(props.timeEntry.id)}/></i>
        </div>
        <div className='time-entry-display'>
          {DateHelper.toDurationAsClock(props.timeEntry.start, props.timeEntry.end ? props.timeEntry.end : props.now)}
        </div>
      </div>
    </div>
  );
};

const TimeEntryCheckbox = ({ value, onChange }: { value: any; onChange: any}) => {
  return (
     <div className="time-entry-selection">  
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
      </label>
     </div>
  );
};
