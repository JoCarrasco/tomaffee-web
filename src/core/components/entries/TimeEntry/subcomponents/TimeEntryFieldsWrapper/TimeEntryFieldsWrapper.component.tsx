import { ITimeEntry } from '../../../../../models';
import { IBasicDataHandler } from '../../../../../models/interfaces/time-entry';
import { BasicFormComponent } from '../../../../forms/BasicForm/BasicForm.component';
import './TimeEntryFieldsWrapper.styles.scss';
interface ITimeEntryFieldsWrapperComponentProps extends IBasicDataHandler {
  title: string;
  description?: string;
  isEditable: boolean;
}

export const TimeEntryFieldsWrapperComponent = (
  props: ITimeEntryFieldsWrapperComponentProps,
) => {
  const defaultValue = 'Add a description';
  const canEdit = props.isEditable;
  const title = props.title ? props.title : defaultValue;

  function handleChange(propName: string, value: string) {
    return props.onValueChange({ key: propName as keyof ITimeEntry, value });
  }

  return (
    <div className="time-entry-text-info-wrapper">
      <BasicFormComponent
        allowEditOnClick={canEdit}
        initialValue={title}
        onStopEdit={(val) => handleChange('title', val)}
      />
    </div>
  );
};
