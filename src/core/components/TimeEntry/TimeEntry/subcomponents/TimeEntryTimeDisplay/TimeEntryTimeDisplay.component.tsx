import React from 'react';
import { DateHelper } from '../../../../../classes';

export function TimeEntryTimeDisplayComponent(props: { start: Date, end: Date | undefined, now: Date }) {
  return (
    <div className='time-entry-display'>
      {DateHelper.toDurationAsClock(props.start, props.end ? props.end : props.now)}
    </div>
  )
}
