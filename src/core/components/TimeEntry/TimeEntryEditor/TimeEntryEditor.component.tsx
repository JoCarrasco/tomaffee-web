import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { BackdropComponent, ITimeEntryEditorEditedValue, TimeEntryEditorFormComponent } from '../..';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import './TimeEntryEditor.style.scss';

interface ITimeEntryEditorProps {
  show: boolean;
  timeEntryId: number;
  staticTimeEntry?: ITimeEntry;
  onEditionClosed: () => any;
  onEditionFinished: () => any;
}

export const TimeEntryEditorComponent = (props: ITimeEntryEditorProps) => {
  const [draftTimeEntry, setDraftTimeEntry] = useState<ITimeEntry | undefined>(undefined);
  
  React.useEffect(() => {
    if (props.show) {
      setDraftTimeEntry(props.staticTimeEntry);
      ApiService.getTimeEntryById(props.timeEntryId).then((targetTimeEntry) => {
        setDraftTimeEntry(targetTimeEntry);
      });
    } else {
      setDraftTimeEntry(undefined);
    }
  }, [props.show]);

  function handleEditionClose() {
    props.onEditionClosed();
  }

  function handleEditionSubmitionRequest(editedValues: ITimeEntryEditorEditedValue[]) {
    if (editedValues.length > 0) {
      const id = props.timeEntryId;
      const updateTimeEntry: any = { id };
      editedValues.forEach((e) => updateTimeEntry[e.key] = e.value);
      ApiService.updateTimeEntry(updateTimeEntry).then(() => {
        TimeEntryService.sendChangeRequest([{ id }]);
        props.onEditionFinished();
      });
    }
  }

  function getForm() {
    if (draftTimeEntry !== undefined) {
      return (
        <TimeEntryEditorFormComponent
          staticTimeEntry={draftTimeEntry}
          onFinishEditing={handleEditionSubmitionRequest}></TimeEntryEditorFormComponent>
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
              <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleEditionClose()}/>
            </div>
            {getForm()}
          </div>
        </BackdropComponent>
      );
    } else {
      return (<></>);
    }
  }

  return getWrapper();
}
