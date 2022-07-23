import { DateHelper } from '../../../../../classes';

interface ITimeEntryDurationComponentProps {
  start: Date;
  end: Date;
}

export function TimeEntryDurationComponent(
  props: ITimeEntryDurationComponentProps,
) {
  return <p>{DateHelper.toDurationAsClock(props.start, props.end)}</p>;
}
