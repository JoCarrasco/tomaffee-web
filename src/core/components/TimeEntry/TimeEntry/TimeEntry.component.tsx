import React from 'react';
import { DateHelper } from '../../../classes/date-helper.class';
import { ITimeEntry, ITimeEntryBareBones } from '../../../models/api';
import { ApiService } from '../../../services/api/api.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import './TimeEntry.style.scss';

interface ITimeEntryComponentProps {
  timeEntry: ITimeEntry;
  alternativeDisplayOfTime?: string;
  onTimeEntryStop: (...args: any[]) => any;
}

export const TimeEntryComponent = (props: ITimeEntryComponentProps) => {
  const [localInterval, setLocalInterval] = React.useState<NodeJS.Timeout | null>(null);
  const [displayOfTime, setDisplayOfTime] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(props.timeEntry.title);
  
  React.useEffect(() => {
    if (displayOfTime === null) {
      if (props.alternativeDisplayOfTime === undefined) {
        ApiService.isTimeEntryOnGoing().then((isTimeEntryOnGoing) => {
          if (isTimeEntryOnGoing) {
            ApiService.getUnfinishedTimeEntry().then((timeEntry) => {
              if (timeEntry !== undefined) {
                if (timeEntry.id === props.timeEntry.id) {
                  setLocalInterval(setInterval(() => {
                    if (timeEntry.end === undefined) {
                      setDisplayOfTime(DateHelper.getHoursAndMinutesFromNow(timeEntry.start));
                    } else {
                      clearInterval(localInterval!);
                      setLocalInterval(null);
                    }
                  }, 1000));
                } else {
                  if (props.timeEntry.end) {
                    console.log('HAS END');
                    setDisplayOfTime(DateHelper.getDurationFromStartAndEnd(props.timeEntry.start, props.timeEntry.end));
                  }
                }
              }
            });
          } else {
            if (props.timeEntry.end) {
              setDisplayOfTime(DateHelper.getDurationFromStartAndEnd(props.timeEntry.start, props.timeEntry.end));
            }
          }
        });
      } else {
        const altDisplayOfTime = props.alternativeDisplayOfTime;
        setDisplayOfTime(altDisplayOfTime ? altDisplayOfTime : null);
      }
    }
  }, []);

  function initTitleEdition() {
    setIsEditing(true);
  }

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
    clearInterval(localInterval!);
    setLocalInterval(null);
  }

  return (
    <div className="time-entry-default">
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
        <p>{displayOfTime}</p>
      </div>
      <div>
        <i className="time-entry-edit-icon"><FontAwesomeIcon icon={faEdit} /></i>
        <i className="time-entry-stop-icon" onClick={() => stopCurrentOnGoingTimeEntry()}><FontAwesomeIcon icon={faStopCircle} /></i>
      </div>
    </div>
  );
};
