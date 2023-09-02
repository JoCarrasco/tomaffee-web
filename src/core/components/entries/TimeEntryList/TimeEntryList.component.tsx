import React, { useEffect } from 'react';
import { TimeEntryHelper } from '../../../classes/time-entry/time-entry-helper.class';
import { ITimeEntryFinished } from '../../../models';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import { TimeEntryListHeaderComponent } from './subcomponents/TimeEntryListHeader/TimeEntryListHeader.component';
import { ITimeEntryListComponentProps } from './TimeEntryList.models';

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  useEffect(() => { }, [props.entries]);
  
  const timeEntryLists = TimeEntryHelper.parseEntriesToEntriesWithDate(
    props.entries,
  );

  const EmptyTimeEntriesFallback = () => { 
    return  props.entries.length === 0 ? <p>No Time Entries</p> : null; 
  }

  const TimeEntry: (entry: ITimeEntryFinished) => JSX.Element = (entry: ITimeEntryFinished) => {
    return (
      <TimeEntryComponent
        key={entry.id}
        enableSelection={false}
        timeEntry={entry}
        {...props}
        onChange={props.onValueChange}
      />
    );
  }

  const TimeEntryList = () => {
    return (
      <>
        {timeEntryLists.map((timeEntryList, index) => (
          <div key={index.toString()}>
            <TimeEntryListHeaderComponent
              date={timeEntryList.date}
            ></TimeEntryListHeaderComponent>
            <div>
              {timeEntryList.entries.map((entry) => TimeEntry(entry))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div>
      { timeEntryLists.length ? TimeEntryList : EmptyTimeEntriesFallback }
    </div>
  );
};
