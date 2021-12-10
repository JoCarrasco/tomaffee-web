import React from 'react';
import { Subscription } from 'rxjs';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';

export const TimeEntryListComponent = () => {
  const [timeEntries, setTimeEntries] = React.useState<ITimeEntry[] | null>(null);
  const [timeEntryId, setTimeEntryId] = React.useState<number | null>(null);
  const [nowInDate, setNowInDate] = React.useState<Date>(new Date());
  const [timeServiceSubscription, setTimeServiceSubscription] = React.useState<Subscription | null>(null);

  React.useEffect(() => {
    ApiService.getUserTimeEntries().then((storedEntries) => {
      setTimeEntries(storedEntries);
    });
    
    if (!timeServiceSubscription) {
      setTimeServiceSubscription(
        TimeEntryService.getWatcher().subscribe((info) => {
          if (info) {
            setNowInDate(info.now);
            const watcherTimeEntryId = info.timeEntryId;
            if (watcherTimeEntryId !== undefined) {
              setTimeEntryId(watcherTimeEntryId);
            }
          } else {
            setTimeEntryId(null);
          }
        })
      )
    }
  }, [timeEntryId]);

  function getTimeEntriesTemplate() {
    if (timeEntries === null) {
      return (<p>No Time Entries</p>);
    } else {
      if (timeEntries.length > 0) {
        return (
          <div>
            {timeEntries.map((timeEntry, i) => (
              <TimeEntryComponent
                key={i}
                isOnGoing={timeEntry.id === timeEntryId}
                now={timeEntry.id === timeEntryId ? nowInDate : undefined}
                timeEntry={timeEntry}
                onTimeEntryStop={() => { }}
              />
            ))}
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
