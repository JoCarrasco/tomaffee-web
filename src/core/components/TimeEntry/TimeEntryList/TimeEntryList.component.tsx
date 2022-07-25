import React from 'react';
import { TimeEntryHelper } from '../../../classes/time-entry/time-entry-helper.class';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import { TimeEntryListHeaderComponent } from './subcomponents/TimeEntryListHeader/TimeEntryListHeader.component';
import { ITimeEntryListComponentProps } from './TimeEntryList.models';

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  const timeEntryLists = TimeEntryHelper.parseEntriesToEntriesWithDate(
    props.entries,
  );
  const noEntriesTplFallback =
    props.entries.length === 0 ? <p>No Time Entries</p> : null;

  function renderList() {
    return (
      <>
        {noEntriesTplFallback}
        {timeEntryLists.map((timeEntryList) => (
          <div key={timeEntryList.date.getTime().toString()}>
            <TimeEntryListHeaderComponent
              date={timeEntryList.date}
            ></TimeEntryListHeaderComponent>
            <div>
              {timeEntryList.entries.map((entry) => (
                <TimeEntryComponent
                  key={entry.id}
                  isActive={
                    props.forcedActiveTimeEntryId === undefined &&
                    entry.end === undefined
                  }
                  enableSelection={false}
                  timeEntry={entry}
                  {...props}
                  onChange={props.onValueChange}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return <div>{renderList()}</div>;
}
