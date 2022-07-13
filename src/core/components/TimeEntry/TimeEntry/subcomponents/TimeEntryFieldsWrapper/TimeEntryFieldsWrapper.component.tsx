interface ITimeEntryFieldsWrapperComponent {
  title: string;
  description?: string;
}

export const TimeEntryFieldsWrapperComponent = (props: ITimeEntryFieldsWrapperComponent) => {
  return (
    <div className="time-entry-text-info-wrapper">
      <TimeEntryFieldTitle title={props.title}/>
      <TimeEntryFieldDescription description={props.description}/>
    </div>
  );
}

const TimeEntryFieldDescription = (props: { description?: string }) => {
  return (
    props.description !== undefined
      ?
      <p className="time-entry-text-description">
        {props.description}
      </p>
      : null
  );
}

const TimeEntryFieldTitle = (props: { title?: string }) => {
  return (
    <p>{props.title === '' ? 'Add a title' : props.title}</p>
  );
}
