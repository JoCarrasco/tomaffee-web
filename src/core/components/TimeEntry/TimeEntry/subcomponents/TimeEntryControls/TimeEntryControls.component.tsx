import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faStopCircle, faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryButtonComponent } from '../TimeEntryButton';
import './TimeEntryControls.styles.scss';

interface ITimeEntryControlsProps {
  isActive: boolean;
  onClickRemove?: () => any;
  onClickStop?: () => any;
  onClickContinue?: () => any;
  onClickEdit?: () => any;
}

export function TimeEntryControlsComponent(props: ITimeEntryControlsProps) {
  return (
    <div className="time-entry-icon-wrapper">
      <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} onClick={props.onClickEdit}/></i>
      {
        props.isActive
          ? <TimeEntryButtonComponent icon={faStopCircle} onClick={props.onClickStop}/>
          : <TimeEntryButtonComponent icon={faPlayCircle} onClick={props.onClickContinue}/>
      }
      <i className="time-entry-remove-icon"><FontAwesomeIcon icon={faTrashAlt} onClick={props.onClickRemove}/></i>
    </div>
  )
}