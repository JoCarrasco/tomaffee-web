import React from 'react';
import { TimeEntryHelper } from '../../../classes/time-entry/time-entry-helper.class';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import { TimeEntryListHeaderComponent } from './subcomponents/TimeEntryListHeader/TimeEntryListHeader.component';
import { ITimeEntryListComponentProps } from './TimeEntryList.models';

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  const [bulkEdit, setBulkEdit] = React.useState<boolean>(false);
  const timeEntryLists = TimeEntryHelper.parseEntriesToEntriesWithDate(props.entries);
  const noEntriesTplFallback = props.entries.length === 0 ? (<p>No Time Entries</p>) : null;

  function renderList() {
    return (
      <>
        {noEntriesTplFallback}
        {timeEntryLists.map((timeEntryList) => (
          <>
            <TimeEntryListHeaderComponent
              date={timeEntryList.date}
            ></TimeEntryListHeaderComponent>
            {timeEntryList.entries.map((entry) => (
              <div>
                <TimeEntryComponent
                  key={entry.id}
                  isActive={
                    props.forcedActiveTimeEntryId === undefined &&
                    entry.end === undefined
                  }
                  enableSelection={bulkEdit}
                  timeEntry={entry}
                  onTimeEntryRemove={props.onRemove}
                  onTimeEntryContinue={props.onContinue}
                  onTimeEntryStop={props.onStop}
                  onTimeEntryChange={props.onValueChange}
                />
              </div>
            ))}
          </>
        ))}
      </>
    );
  }

  return (
    <div>
      {renderList()}
    </div>
  );
}
