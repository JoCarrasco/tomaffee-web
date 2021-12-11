import React from 'react';
import { Subscription } from 'rxjs';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';

export const TimeEntryListComponent = () => {
  const [timeEntries, setTimeEntries] = React.useState<ITimeEntry[] | null>(null);
  const [timeEntryId, setTimeEntryId] = React.useState<number | null>(null);
  const [canUpdateTimeEntries, setCanUpdateTimeEntries] = React.useState<boolean>(true);
  const [nowInDate, setNowInDate] = React.useState<Date>(new Date());
  const [timeServiceSubscription, setTimeServiceSubscription] = React.useState<Subscription | null>(null);
  const [changeRequestSubscription, setChangeRequestSubscription] = React.useState<Subscription | null>(null);
  
  React.useEffect(() => {
    if (canUpdateTimeEntries) {
      ApiService.getUserTimeEntries().then((storedEntries) => {
        setTimeEntries(storedEntries);
        setCanUpdateTimeEntries(false);
      });
    }
  }, [timeEntryId, timeEntries]);

  React.useLayoutEffect(() => {
    setSubscriptions();
  }, [])

  function setSubscriptions() {
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
      );
    }
  
    if (!changeRequestSubscription) {
      setChangeRequestSubscription(TimeEntryService.getChangeRequests().subscribe((changes) => {
        if (changes !== null && changes?.length > 0) {
          setCanUpdateTimeEntries(true);
          ApiService.getUserTimeEntries().then((storedEntries) => {
            setTimeEntries(storedEntries);
            setCanUpdateTimeEntries(false);
            TimeEntryService.closeChangeRequest();
          });
        }

        // NOTE: Use this code in order to provide a more efficient render! 

        // if (changes !== null && timeEntries !== null) {
        //   const ids = changes.map((c) => c.id);
        //   if (ids.length > 0) {
        //     setCanUpdateTimeEntries(true);
        //   }
          // ApiService.getTimeEntriesByIds(ids).then((requestedEntries) => {
          //   requestedEntries.forEach((entry) => {
          //     const copyEntries = timeEntries;
          //     const targetTimeEntryIndex = copyEntries.findIndex(t => t.id === entry.id);
          //     copyEntries[targetTimeEntryIndex] = entry;
          //     setTimeEntries(copyEntries);
          //     TimeEntryService.closeChangeRequest();
          //   })
          // });
        // }
      }));
    }
  }

  function getTimeEntriesTemplate() {
    if (timeEntries === null) {
      return (<p>No Time Entries</p>);
    } else {
      return (
        <div>
          {timeEntries.map((timeEntry, i) => (
            <div>
              <TimeEntryComponent
                key={i}
                isOnGoing={timeEntry.id === timeEntryId}
                now={timeEntry.id === timeEntryId ? nowInDate : undefined}
                timeEntry={timeEntry}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      {getTimeEntriesTemplate()}
    </div>
  );
}
