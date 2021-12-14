import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry } from '../../../models/api';
import { TimeEntryComponent } from '../TimeEntry/TimeEntry.component';
import './TimeEntryList.style.scss';

interface ITimeEntryListComponentProps {
  date: Date;
  entries: ITimeEntry[];
  now: Date;
  currentOngoingTimeEntryId?: number | null;
}

export const TimeEntryListComponent = (props: ITimeEntryListComponentProps) => {
  const [bulkEdit, setBulkEdit] = React.useState<boolean>(false);

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
                key={i}
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
