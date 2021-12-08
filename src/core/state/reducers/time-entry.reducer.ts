import { ITimeEntry } from "../../models/api";
import { ITimeEntryAction, TimeEntryActionType } from "../actions/time-entry.action";

export interface ITimeEntryState {
  onGoingTimeEntryId?: number;
  fetchedTimeEntries: ITimeEntry[];
}

const initialTimeEntryState: ITimeEntryState = {
  fetchedTimeEntries: []
}

const TimeEntryReducer = (state = initialTimeEntryState, action: ITimeEntryAction) => {
  switch (action.type) {
    case TimeEntryActionType.Add: {
      const { id } = action.payload;
      return {
        ...state,
        currentTimeEntryId: id
      }
    }
    default:
      return state
  }
}

export default TimeEntryReducer;