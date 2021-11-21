import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { StorageKey } from '../../../static/storage-key.enum';

export const TimeEntryList = () => {
  const [timeEntries, setTimeEntries] = React.useState<ITimeEntry[] | null>(null);
  const [localInterval, setLocalInterval] = React.useState<NodeJS.Timeout | null>(null);
  const [displayOfTime, setDisplayOfTime] = React.useState<string | null>(null);
  
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
  
  function setTitle(title: string): string {
    return title !== '' ? title : 'Add a title to your time entry...';
  }

  function simplifyDate(date: Date): string {
    return DateHelper.parseToStrOfHoursAndMinutes(date);
  }

  function getTimeEntriesTemplate() {
    if (timeEntries === null) {
      return (
        <p>No Time Entries</p>
      );
    } else {
      if (timeEntries.length > 0) {
        return (
          <div>
            {timeEntries.map((timeEntry, i) => 
              <div key={i}>
                <p>{setTitle(timeEntry.title)}</p>
                <p>Time Length {simplifyDate(timeEntry.start)}</p>
              </div>
            )}
          </div>
        )
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
  )
}