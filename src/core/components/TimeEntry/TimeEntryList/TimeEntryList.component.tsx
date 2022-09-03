import React from 'react';
import { TimeEntryHelper } from '../../../classes/time-entry/time-entry-helper.class';
import { ITimeEntryNotNull } from '../../../models';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import { TimeEntryListHeaderComponent } from './subcomponents/TimeEntryListHeader/TimeEntryListHeader.component';
import { ITimeEntryListComponentProps } from './TimeEntryList.models';

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  const timeEntryLists = TimeEntryHelper.parseEntriesToEntriesWithDate(
    props.entries,
  );
  const noEntriesTplFallback =
    props.entries.length === 0 ? <p>No Time Entries</p> : null;

  function renderTimeEntry(entry: ITimeEntryNotNull) {
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

  function renderList() {
    return (
      <>
        {noEntriesTplFallback}
        {timeEntryLists.map((timeEntryList, index) => (
          <div key={index.toString()}>
            <TimeEntryListHeaderComponent
              date={timeEntryList.date}
            ></TimeEntryListHeaderComponent>
            <div>
              {timeEntryList.entries.map((entry) => renderTimeEntry(entry))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return <div>{renderList()}</div>;
};
