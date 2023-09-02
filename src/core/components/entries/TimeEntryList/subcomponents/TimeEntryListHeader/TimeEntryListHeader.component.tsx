import React from 'react';
import { DateHelper } from '../../../../../classes';
import './TimeEntryListHeader.styles.scss';

interface ITimeEntryListHeaderComponentProps {
  date: Date;
}

export const TimeEntryListHeaderComponent = (props: ITimeEntryListHeaderComponentProps) => {
  return (
      <div className="time-entry-list-header">
        <span>{DateHelper.toFriendlyDate(props.date)}</span>
        {/* <button onClick={() => setBulkEdit(!bulkEdit)}>Bulk Edit</button> */}
      </div>
  );
}
