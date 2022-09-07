import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopCircle,
  faPlayCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { TimeEntryButtonComponent } from '../TimeEntryButton';
import './TimeEntryControls.styles.scss';

interface ITimeEntryControlsProps {
  isActive: boolean;
  onRemove?: () => any;
  onStop?: () => any;
  onContinue?: () => any;
}

export function TimeEntryControlsComponent(props: ITimeEntryControlsProps) {
  const StopButton = (
    <TimeEntryButtonComponent icon={faStopCircle} onClick={props.onStop} />
  );

  const PlayButton = (
    <TimeEntryButtonComponent icon={faPlayCircle} onClick={props.onContinue} />
  );

  const RemoveButton = (
    <i className="time-entry-remove-icon">
      <FontAwesomeIcon icon={faTrashAlt} onClick={props.onRemove} />
    </i>
  );

  return (
    <div className="time-entry-icon-wrapper">
      {props.isActive ? StopButton : PlayButton}
      {RemoveButton}
    </div>
  );
}
