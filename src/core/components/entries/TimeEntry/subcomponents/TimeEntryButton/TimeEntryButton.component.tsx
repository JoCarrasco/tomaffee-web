import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITimeEntryButtonComponentProps {
  onClick?: () => any;
  icon: IconDefinition;
  className?: string;
}

export const TimeEntryButtonComponent = (props: ITimeEntryButtonComponentProps) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <i className="time-entry-action-icon">
        <FontAwesomeIcon icon={props.icon} />
      </i>
    </button>
  )
}
