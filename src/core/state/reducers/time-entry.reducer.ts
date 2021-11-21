import { TimeEntryActionType, TTimeEntryAction } from "../actions/time-entry.action";

const TimeEntryReducer = (state = [], action: TTimeEntryAction) => {
  switch (action.type) {
    case TimeEntryActionType.Add:
      return [
        ...state,
        {
          title: action.title,
          start: new Date()
        }
      ]
    default:
      return state
  }
}

export default TimeEntryReducer;