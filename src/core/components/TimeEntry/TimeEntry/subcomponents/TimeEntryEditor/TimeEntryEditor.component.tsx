import React, { useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITimeEntry } from '../../../../../models/api';
import { TimeEntryService } from '../../../../../services';
import { ITimeEntryEditorEditedValue, TimeEntryEditorFormComponent } from './subcomponents/TimeEntryEditorForm';
import { ITimeEntryEditorProps } from './TimeEntryEditor.models';
import { BackdropComponent } from '../../../../Misc';
import './TimeEntryEditor.style.scss';

export const TimeEntryEditorComponent = (props: ITimeEntryEditorProps) => {
  const [draftTimeEntry, setDraftTimeEntry] = useState<ITimeEntry | undefined>(undefined);

  React.useEffect(() => {
    if (props.show) {
      setDraftTimeEntry(props.staticTimeEntry);
      // TimeEntryService.getTimeEntryById(props.timeEntryId).then(
      //   (targetTimeEntry) => {
      //     setDraftTimeEntry(targetTimeEntry);
      //   },
      // );
    } else {
      setDraftTimeEntry(undefined);
    }
  }, [props.show]);

  function handleEditionClose() {
    props.onEditionClosed();
  }

  function handleEditionSubmitionRequest(
    editedValues: ITimeEntryEditorEditedValue[] | null,
  ) {
    if (editedValues !== null) {
      if (editedValues.length > 0) {
        const id = props.timeEntryId;
        const updateTimeEntry: any = { id };
        editedValues.forEach((e) => (updateTimeEntry[e.key] = e.value));
        // TimeEntryService.updateTimeEntry(updateTimeEntry).then(() => {
        //   props.onEditionFinished();
        // });
      } else {
        props.onEditionFinished();
      }
    } else {
      props.onEditionFinished();
      // TimeEntryService.removeTimeEntry(props.timeEntryId);
    }
  }

  function getForm() {
    if (draftTimeEntry !== undefined) {
      return (
        <TimeEntryEditorFormComponent
          staticTimeEntry={draftTimeEntry}
          onFinishEditing={handleEditionSubmitionRequest}
        />
      );
    }
  }

  function getWrapper() {
    if (props.show && draftTimeEntry) {
      return (
        <BackdropComponent onOutsideClick={() => handleEditionClose()}>
          <div className="time-entry-editor">
            <div className="time-entry-editor-header">
              <span>Editing Time Entry</span>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={() => handleEditionClose()}
              />
            </div>
            {getForm()}
          </div>
        </BackdropComponent>
      );
    } else {
      return <></>;
    }
  }

  return getWrapper();
};
