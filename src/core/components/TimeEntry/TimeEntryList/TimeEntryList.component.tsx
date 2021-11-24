import React from 'react';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';

export const TimeEntryListComponent = () => {
  const [timeEntries, setTimeEntries] = React.useState<ITimeEntry[] | null>(null);

  React.useEffect(() => {
    if (timeEntries === null) {
      ApiService.getUserTimeEntries().then((storedEntries) => {
        setTimeEntries(storedEntries);
      });
    }
  }, []);

  function onTimeEntryStop() {
    TimeEntryService.forceUpdate();
  }

  function getTimeEntriesTemplate() {
    if (timeEntries === null) {
      return (<p>No Time Entries</p>);
    } else {
      if (timeEntries.length > 0) {
        return (
          <div>
            {timeEntries.map((timeEntry, i) => {
              return (
                <TimeEntryComponent key={i} timeEntry={timeEntry} onTimeEntryStop={onTimeEntryStop} />
              )
            })}
          </div>
        );
      } else {
        return (
          <p>No Time Entries</p>
        );
      }
    }
  }

  return (
    <div>
      {getTimeEntriesTemplate()}
    </div>
  );
}
