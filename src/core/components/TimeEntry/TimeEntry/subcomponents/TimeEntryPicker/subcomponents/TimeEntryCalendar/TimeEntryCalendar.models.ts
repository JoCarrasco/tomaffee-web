import { TimeEntryCalendar } from "./TimeEntryCalendar.component";

export type TimeEntryCalendarHandleType = React.ElementRef<typeof TimeEntryCalendar>;
export interface ITimeEntryCalendarHandle {
  show: () => void;
}
