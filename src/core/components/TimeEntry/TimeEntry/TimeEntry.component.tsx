import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry, ITimeEntryBareBones } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { TimeEntryService } from '../../../services/time-entry/time-entry.service';
import './TimeEntry.style.scss';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  onTimeEntryStop: (...args: any[]) => any;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(props.timeEntry.title);
  const [timeDisplay, setTimeDisplay] = React.useState<string | null>();
  const [isLocalTimeEntryOnGoing, setIsLocalTimeEntryOnGoing] = React.useState<boolean>(false);
  
  function initTitleEdition() {
    setIsEditing(true);
  }

  React.useLayoutEffect(() => {
    TimeEntryService.getAllInfo().subscribe((info) => {
      if (info !== null && info.timeEntry !== null) {
        if (info.timeEntry.id === props.timeEntry.id) {
          setTimeDisplay(info.timeDisplay ? info.timeDisplay : '...');
          setIsLocalTimeEntryOnGoing(true);
        } else {
          setTimeDisplay(DateHelper.getDurationFromStartAndEnd(props.timeEntry.start, props.timeEntry.end!));
          DateHelper.getDurationFromStartAndEnd(props.timeEntry.start, props.timeEntry.end!)
        }
      } else {
        setTimeDisplay(DateHelper.getDurationFromStartAndEnd(props.timeEntry.start, props.timeEntry.end!));
        setIsLocalTimeEntryOnGoing(false);
      }
    });
  })

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
    await ApiService.stopTimeEntry(props.timeEntry.id);
    props.onTimeEntryStop(props.timeEntry.id);
    TimeEntryService.forceUpdate();
  }

  async function createNewEntry() {
    await ApiService.createNewEntry();
    TimeEntryService.forceUpdate();
  }

  return (
    <div className={`time-entry-default ${isLocalTimeEntryOnGoing ? 'time-entry-active' : ''}`}>
      <div onClick={() => initTitleEdition()} className="time-entry-text-info-wrapper">
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
        <p>{timeDisplay}</p>
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
};
