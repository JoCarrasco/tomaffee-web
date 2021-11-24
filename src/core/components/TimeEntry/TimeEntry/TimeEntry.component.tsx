import React from 'react';
import { ITimeEntry, ITimeEntryBareBones } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import { TimeEntryPickerComponent } from '../TimeEntryPicker/TimeEntryPicker.component';
import { DateHelper } from '../../../classes/date-helper.class';
import './TimeEntry.style.scss';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  onTimeEntryStop: (...args: any[]) => any;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(props.timeEntry.title);
  const [isLocalTimeEntryOnGoing, setIsLocalTimeEntryOnGoing] = React.useState<boolean>(false);
  const [timeEntry, setTimeEntry] = React.useState<ITimeEntry | null>(null);
  const [nowInDate, setNowInDate] = React.useState<Date>(props.timeEntry.end ? props.timeEntry.end : DateHelper.getNow());
  const [canEdit, setCanEdit] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    TimeEntryService.getAllInfo().subscribe((info) => {
      if (info?.editingTimeEntryId === undefined) {
        setCanEdit(true);
      } else {
        setCanEdit(info?.editingTimeEntryId === props.timeEntry.id);
      }

      if (info !== null && info.timeEntry !== undefined) {
        if (info.timeEntry.id === props.timeEntry.id) {
          setTimeEntry(info.timeEntry);
          if (!isLocalTimeEntryOnGoing) {
            setIsLocalTimeEntryOnGoing(true);
            setNowInDate(info.now);
          }
        } else {
          setTimeEntry(props.timeEntry);
        }
      } else {
        setTimeEntry(props.timeEntry);
      }
    });
  }, []);

  function handleTitleInputChange(value: string) {
    setTitle(value);
  }

  function getTimeEntryEditable(): Partial<ITimeEntryBareBones> {
    return {
      id: props.timeEntry.id,
      title
    }
  }

  async function stopEdition() {
    setIsEditing(false);
    const updatedTimeEntry = getTimeEntryEditable();
    await ApiService.updateTimeEntry(updatedTimeEntry);
  }

  async function stopCurrentOnGoingTimeEntry() {
    if (timeEntry !== null) {
      await ApiService.stopTimeEntry(timeEntry.id);
      props.onTimeEntryStop(timeEntry.id);
      TimeEntryService.forceUpdate();
      stopEdition();
    }
  }

  async function createNewEntry() {
    await ApiService.createNewEntry();
    TimeEntryService.forceUpdate();
  }

  function startEdition() {
    if (canEdit) {
      TimeEntryService.setIsEditing(props.timeEntry.id);
    }
  }

  if (timeEntry !== null) {
    return (
      <div className={`time-entry-default ${isLocalTimeEntryOnGoing ? 'time-entry-active' : ''}`}>
        <div className="time-entry-text-info-wrapper">
          {
            isEditing ?
            <input
              onChange={(e) => { handleTitleInputChange(e.target.value) }}
              onBlur={() => stopEdition()}
              contentEditable="true"
              placeholder="Add a description"
              className="time-entry-input-edit"
              type="text" value={title} /> :
            <p>{title === '' ? 'Add a description' : title}</p>
          }
        </div>
        <div>
          <div>
            <TimeEntryPickerComponent
              onStartEdit={() => startEdition()}
              start={timeEntry.start} end={nowInDate} canEdit={canEdit} />
          </div>
        </div>
        <div>
          <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} /></i>
          {
            isLocalTimeEntryOnGoing ?
            <i className="time-entry-stop-icon" onClick={() => stopCurrentOnGoingTimeEntry()}>
              <FontAwesomeIcon icon={faStopCircle} />
            </i> :
            <i className="time-entry-start-icon" onClick={() => createNewEntry()}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </i>
          }
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
};
