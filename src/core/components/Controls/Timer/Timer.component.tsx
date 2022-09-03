import { BasicFormComponent } from '../../Forms';

interface IControlTimerComponentProps {
  activeTimeEntryId?: string;
}

export const ControlTimerComponent = (props: IControlTimerComponentProps) => {
  function onStopTitleEdit() {
    //
  }

  return (
    <>
      Hello
      <BasicFormComponent initialValue="" onStopEdit={onStopTitleEdit} />
    </>
  );
};
