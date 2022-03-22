import React from 'react';
import { DateHelper } from '../../../classes';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import { ITimeEntryListComponentProps } from './TimeEntryList.models';
import './TimeEntryList.style.scss';

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  const [bulkEdit, setBulkEdit] = React.useState<boolean>(false);
  // const [selectedEntries, setSelectedEntries] = React.useState<number[]>([]);
  
  function getTimeEntriesTemplate() {
    if (props.entries.length < 1) {
      return (<p>No Time Entries</p>);
    } else {
      return (
        <div>
          <div className="time-entry-list-header">
            <span>{DateHelper.toFriendlyDate(props.date)}</span>
            <button onClick={() => setBulkEdit(!bulkEdit)}>Bulk Edit</button>
          </div>
          {props.entries.map((timeEntry, i) => (
            <div>
              <TimeEntryComponent
                key={i.toString()}
                enableSelection={bulkEdit}
                isOnGoing={timeEntry.id === props.currentOngoingTimeEntryId}
                now={timeEntry.id === props.currentOngoingTimeEntryId ? props.now : undefined}
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
