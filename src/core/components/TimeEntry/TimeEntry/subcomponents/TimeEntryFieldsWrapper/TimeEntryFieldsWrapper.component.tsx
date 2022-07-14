import { useState } from "react";
import { ITimeEntryPropChange } from "../..";
import { BasicFormComponent } from '../../../../Forms/BasicForm/BasicForm.component';

interface ITimeEntryFieldsWrapperComponent {
  title: string;
  description?: string;
  allowEdit: boolean;
  onValueChange: (obj: ITimeEntryPropChange) => any;
}

export const TimeEntryFieldsWrapperComponent = (
  props: ITimeEntryFieldsWrapperComponent,
) => {
  return (
    <div className="time-entry-text-info-wrapper">
      <TimeEntryFieldTitle
        title={props.title}
        onValueChange={(val) =>
          props.onValueChange({ key: 'title', value: val })
        }
        allowEdit={props.allowEdit}
      />
      <TimeEntryFieldDescription description={props.description} />
    </div>
  );
};

const TimeEntryFieldDescription = (props: { description?: string }) => {
  return props.description !== undefined ? (
    <p className="time-entry-text-description">{props.description}</p>
  ) : null;
};

interface ITimeEntryFieldTitleProps {
  title?: string;
  allowEdit: boolean;
  onValueChange: (val: string) => any;
}

const TimeEntryFieldTitle = (props: ITimeEntryFieldTitleProps) => {
  const title =
    props.title === '' || props.title === undefined
      ? 'Add a title'
      : props.title;
  const [isEditing, setIsEditing] = useState(false);

  function handleStopEdit(val: string) {
    setIsEditing(false);
    props.onValueChange(val);
  }

  return isEditing && props.allowEdit ? (
    <BasicFormComponent initialValue={title} onStopEdit={handleStopEdit} />
  ) : (
    <p onClick={() => setIsEditing(true)}>{title}</p>
  );
};
