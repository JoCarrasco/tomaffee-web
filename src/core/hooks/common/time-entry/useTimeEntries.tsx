import { useEffect } from "react";
import { ITimeEntry } from '../../../models';
import { TimeEntryService } from "../../../services";
import { useObservable } from "../useObservable";

export function useTimeEntries(): ITimeEntry[] {
  const entries = useObservable(TimeEntryService.timeEntries);

  useEffect(() => {}, [entries]);

  return entries;
}
