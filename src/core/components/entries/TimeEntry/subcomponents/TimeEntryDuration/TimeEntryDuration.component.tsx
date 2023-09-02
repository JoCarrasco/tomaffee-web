import { DateHelper } from '../../../../../classes';

interface ITimeEntryDurationComponentProps {
  start: Date;
  end: Date;
}

export function TimeEntryDurationComponent(
  props: ITimeEntryDurationComponentProps,
) {
  return (
    <p className="time-entry-duration">
      {DateHelper.toDurationAsClock(props.start, props.end)}
    </p>
  );
}
