import React from 'react';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';

export const TimeEntryButtonComponent = () => {
  function createNewTimeEntry() {
    return TimeEntryService.initWithNewTimeEntry();
  }

  return (
    <button onClick={() => createNewTimeEntry()}>
      Create new Time Entry
    </button>
  );
}
