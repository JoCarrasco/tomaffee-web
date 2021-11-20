import React from 'react';
import { ApiService } from '../../../services/api/api.service';

const TimeEntryButton = () => {
  function createNewTimeEntry() {
    return ApiService.createNewEntry();
  }

  return (
    <button onClick={() => createNewTimeEntry()}>
      Create new Time Entry
    </button>
  )
}

export default TimeEntryButton;