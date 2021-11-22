import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { StorageKey } from '../../../static/storage-key.enum';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';

export const TimeEntryListComponent = () => {
  const [timeEntries, setTimeEntries] = React.useState<ITimeEntry[] | null>(null);
  const [localInterval, setLocalInterval] = React.useState<NodeJS.Timeout | null>(null);
  const [displayOfTime, setDisplayOfTime] = React.useState<string | null>(null);
  const [currentOnGoingTimeEntry, setCurrentOnGoingTimeEntry] = React.useState<ITimeEntry | null>(null);
  
  React.useEffect(() => {
    if (timeEntries === null) {
      const timeEntries = localStorage.getItem(StorageKey.TimeEntry);
      if (timeEntries !== null) {
        const parsedEntries = JSON.parse(timeEntries);
        if (parsedEntries) {
          setTimeEntries(parsedEntries);
          ApiService.isTimeEntryOnGoing().then((isTimeEntryOnGoing) => {
            if (isTimeEntryOnGoing) {
              ApiService.getUnfinishedTimeEntry().then((timeEntry) => {
                if (timeEntry !== undefined) {
                  setLocalInterval(setInterval(() => {
                    setCurrentOnGoingTimeEntry(timeEntry);
                    setDisplayOfTime(DateHelper.getHoursAndMinutesFromNow(timeEntry.start));
                  }, 1000));
                }
              });
            }
          });
        }
      }
    }
  }, []);


  function onTimeEntryStop() {
    setLocalInterval(null);
    clearInterval(localInterval!);
    setCurrentOnGoingTimeEntry(null);
    setDisplayOfTime(null);
    setLocalInterval(null);
    ApiService.getUserTimeEntries().then((entries) => {
      setTimeEntries(entries);
    })
  }

  function getTimeEntriesTemplate() {
    if (timeEntries === null) {
      return (<p>No Time Entries</p>);
    } else {
      if (timeEntries.length > 0) {
        return (
          <div>
            {timeEntries.map((timeEntry, i) => {
              if (currentOnGoingTimeEntry !== null) {
                if (timeEntry.id === currentOnGoingTimeEntry.id) {
                  return (
                    <TimeEntryComponent key={i}
                      timeEntry={timeEntry}
                      alternativeDisplayOfTime={displayOfTime ? displayOfTime : ''}
                      onTimeEntryStop={onTimeEntryStop}/>
                  )
                }
              }

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
      <div>
        <p>Current Time Passed: {displayOfTime}</p>
      </div>
      {getTimeEntriesTemplate()}
    </div>
  );
}
