import { useEffect, useState } from "react";
import { TimeEntryHelper } from "../../../classes/time-entry/time-entry-helper.class";

export function useUnfinishedTimeEntryId() {
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    TimeEntryHelper.getUnfinishedTimeEntry().then((timeEntry) => {
      if (timeEntry !== undefined) {
        setId(timeEntry.id);
      }
    });
  }, []);

  return id;
}
