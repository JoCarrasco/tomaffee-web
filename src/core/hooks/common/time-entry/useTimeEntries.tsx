import { useEffect } from "react";
import { TimeEntryService } from "../../../services";
import { useObservable } from "../useObservable";

export function useTimeEntries() {
  const entries = useObservable(TimeEntryService.timeEntries);

  useEffect(() => {
  }, [entries]);

  return entries;
}
