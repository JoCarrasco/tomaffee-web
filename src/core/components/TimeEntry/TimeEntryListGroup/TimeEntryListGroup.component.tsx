import React from 'react';
import { Subscription } from 'rxjs';
import { TimerService } from '../../..';
import { ITimeEntryList } from '../../../models/api/responses/time-entry-list.model';
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
      setupTimeEntries();
    }
  }, [timeEntryList]);

  React.useLayoutEffect(() => {
    setSubscriptions();
  }, []);

  function setSubscriptions() {
    if (!timeServiceSubscription) {
      setTimeServiceSubscription(
        TimerService.watcher.subscribe((info) => {
          if (info) {
            setNowInDate(info.now);
            const id = info.onGoingEntryId;
            if (id !== undefined) {
              setTimeEntryId(id);
            }
          } else {
            setTimeEntryId(null);
          }
        })
      );
    }

    if (!changeRequestSubscription) {
      setChangeRequestSubscription(TimeEntryService.updateFlag.subscribe((updateFlag) => {
        if (updateFlag !== null) {
          if (updateFlag) {
            setupTimeEntries().then(() => {
              TimeEntryService.setUpdateFlag(false);
            });
          }
        }
      }));
    }
  }

  function setupTimeEntries() {
    return TimeEntryService.getRelevantEntries(12).then((storedEntries) => {
      setTimeEntryList(storedEntries);
      setCanUpdateTimeEntries(false);
    });
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
