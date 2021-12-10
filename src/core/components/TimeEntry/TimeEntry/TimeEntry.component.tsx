import React, { useState } from 'react';
import { ITimeEntry } from '../../../models/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryPickerComponent } from '../TimeEntryPicker/TimeEntryPicker.component';
import './TimeEntry.style.scss';
import { TimeEntryEditorComponent } from '../TimeEntryEditor/TimeEntryEditor.component';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  isOnGoing: boolean;
  now?: Date;
  onTimeEntryStop: (...args: any[]) => any;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  async function stopTimeEntrySession() {
    await TimeEntryService.stop();
    props.onTimeEntryStop(props.timeEntry.id);
  }

  async function createNewEntry() {
    TimeEntryService.initWithNewTimeEntry();
  }

  return (
    <div className="time-entry-component-wrapper">
      <TimeEntryEditorComponent show={isEditing} timeEntryId={props.timeEntry.id}/>
      <div className={`time-entry-default ${props.isOnGoing ? 'time-entry-active' : ''}`}>
        <div className="time-entry-text-info-wrapper">
          <p>{props.timeEntry.title === '' ? 'Add a description' : props.timeEntry.title}</p>
        </div>
        <div>
          <div>
            <TimeEntryPickerComponent
              onStartEdit={() => {}}
              start={props.timeEntry.start} end={props.now ? props.now : props.timeEntry.end} canEdit={false} />
          </div>
        </div>
        <div>
          <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/></i>
          {
            props.isOnGoing ?
            <i className="time-entry-stop-icon" onClick={() => stopTimeEntrySession()}>
              <FontAwesomeIcon icon={faStopCircle} />
            </i> :
            <i className="time-entry-start-icon" onClick={() => createNewEntry()}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </i>
          }
        </div>
      </div>
    </div>
  );
};
