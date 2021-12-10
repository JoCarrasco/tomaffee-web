import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ITimeEntry } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import './TimeEntryEditor.style.scss';

interface ITimeEntryEditorProps {
  show: boolean;
  timeEntryId: number;
  staticTimeEntry?: ITimeEntry;
  onEditionClosed?: () => any;
}

export const TimeEntryEditorComponent = (props: ITimeEntryEditorProps) => {
  const [draftTimeEntry, setDraftTimeEntry] = useState<Partial<ITimeEntry> | undefined>(undefined);
  const [canShow, setCanShow] = useState<boolean>(false);
  
  React.useEffect(() => {
    setCanShow(props.show);
    if (props.show) {
      if (!draftTimeEntry) {
        setDraftTimeEntry(props.staticTimeEntry);
        ApiService.getTimeEntryById(props.timeEntryId).then((targetTimeEntry) => {
          setDraftTimeEntry(targetTimeEntry);
        });
      }
    }
  }, [props.show]);

  function handleEditionClose() {
    setCanShow(false);
    if (props.onEditionClosed) {
      props.onEditionClosed();
    }
  }

  function getWrapper() {
    if (canShow && draftTimeEntry) {
      return (
        <div className="time-entry-editor">
          <div className="time-entry-editor-header">
            <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleEditionClose()}/>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={draftTimeEntry.title} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={draftTimeEntry.description} />
          </div>
        </div>
      );
    } else {
      return (<></>);
    }
  }

  return getWrapper();
}
