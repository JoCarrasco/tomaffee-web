import React from 'react';
import { ApiService } from '../../../services/api/api.service';

export const TimeEntryButtonComponent = () => {
  function createNewTimeEntry() {
    return ApiService.createNewEntry();
  }

  return (
    <button onClick={() => createNewTimeEntry()}>
      Create new Time Entry
    </button>
  );
}
