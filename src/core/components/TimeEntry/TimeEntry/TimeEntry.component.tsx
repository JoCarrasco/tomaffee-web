import React, { useState } from 'react';
import { ITimeEntry } from '../../../models/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle, faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryEditorComponent } from '../TimeEntryEditor/TimeEntryEditor.component';
import './TimeEntry.style.scss';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isOnGoing: boolean;
  now?: Date;
  onTimeEntryStop?: (...args: any[]) => any;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  async function stopTimeEntrySession() {
    await TimeEntryService.stop();
    if (props.onTimeEntryStop) {
      props.onTimeEntryStop(props.timeEntry.id);
    }
  }

  async function createNewEntry() {
    TimeEntryService.initWithNewTimeEntry();
  }
  
  return (
    <div className="time-entry-component-wrapper">
      <TimeEntryEditorComponent show={isEditing} timeEntryId={props.timeEntry.id}
        onEditionClosed={() => setIsEditing(false)}
        onEditionFinished={() => setIsEditing(false)}/>
      <div className={`time-entry-default ${props.isOnGoing ? 'time-entry-active' : ''}`}>
        <div className="time-entry-text-info-wrapper">
          <p>{props.timeEntry.title === '' ? 'Add a description' : props.timeEntry.title}</p>
        </div>
        <div className="time-entry-icon-wrapper">
          <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/></i>
          {-
            props.isOnGoing ?
            <i className="time-entry-stop-icon" onClick={() => stopTimeEntrySession()}>
              <FontAwesomeIcon icon={faStopCircle} />
            </i> :
            <i className="time-entry-start-icon" onClick={() => createNewEntry()}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </i>
          }
          <i className="time-entry-remove-icon"><FontAwesomeIcon icon={faTrashAlt} onClick={() => TimeEntryService.removeTimeEntry(props.timeEntry.id)}/></i>
        </div>
      </div>
    </div>
  );
};
