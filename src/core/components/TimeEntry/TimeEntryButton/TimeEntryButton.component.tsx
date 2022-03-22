import React from 'react';
import { TimerService } from '../../../services';

export const TimeEntryButtonComponent = () => {
  return (
    <button onClick={() => TimerService.start()}>
      Create new Time Entry
    </button>
  );
}
