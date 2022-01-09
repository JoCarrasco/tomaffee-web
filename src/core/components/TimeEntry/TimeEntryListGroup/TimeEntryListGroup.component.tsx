import React from 'react';
import { Subscription } from 'rxjs';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntryList } from '../../../models/api/responses/time-entry-list.model';
import { ApiService } from '../../../services/api/api.service';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryListComponent } from '../TimeEntryList/TimeEntryList.component';

export const TimeEntryListGroupComponent = () => {
  const [timeEntryList, setTimeEntryList] = React.useState<ITimeEntryList[] | null>(null);
  const [timeEntryId, setTimeEntryId] = React.useState<number | null>(null);
  const [canUpdateTimeEntries, setCanUpdateTimeEntries] = React.useState<boolean>(true);
  const [nowInDate, setNowInDate] = React.useState<Date>(new Date());
  const [timeServiceSubscription, setTimeServiceSubscription] = React.useState<Subscription | null>(null);
  const [changeRequestSubscription, setChangeRequestSubscription] = React.useState<Subscription | null>(null);
  
  React.useEffect(() => {
    if (canUpdateTimeEntries) {
      ApiService.getRelevantEntries(12, DateHelper.getNow().asDate).then((storedEntries) => {
        setTimeEntryList(storedEntries);
        setCanUpdateTimeEntries(false);
      });
    }
  }, [timeEntryList]);

  React.useLayoutEffect(() => {
    setSubscriptions();
  }, []);

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
          ApiService.getRelevantEntries(12, DateHelper.getNow().asDate).then((storedEntries) => {
            setTimeEntryList(storedEntries);
            setCanUpdateTimeEntries(false);
            TimeEntryService.closeChangeRequest();
          });
        }
      }));
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
    }
  }

  function getTimeEntriesTemplate() {
    if (timeEntryList === null) {
      return (<p>No Time Entries</p>);
    } else {
      return (
        <div>
          {timeEntryList.map((timeEntryList, i) => (
            <TimeEntryListComponent
              key={i}
              now={nowInDate}
              currentOngoingTimeEntryId={timeEntryId}
              date={timeEntryList.date}
              entries={timeEntryList.entries}
            />
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