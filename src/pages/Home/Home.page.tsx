import { useEffect } from "react";
import { TimeEntryService, TimeEntryListComponent } from "../../core";
import { useTimeEntries } from '../../core/hooks';
import { ITimeEntry } from '../../core/models/api';

function HomePage() {
  const entries = useTimeEntries();

  useEffect(() => {
 
  }, [entries]);

  function handleStop(timeEntryId: string) {
    TimeEntryService.stopTimeEntry(timeEntryId);
  }

  function handleRemove(timeEntryId: string) {
    TimeEntryService.removeTimeEntry(timeEntryId);
  }

  function handleContinue(timeEntryId: string) {
    TimeEntryService.continueTimeEntry(timeEntryId);
  }

  function handleChange(timeEntryId: string, change: Partial<ITimeEntry>) {
    TimeEntryService.updateTimeEntry(timeEntryId, change);
  }

  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p onClick={() => TimeEntryService.createNewEntry()}>
        Push button to create time entry
      </p>
      <TimeEntryListComponent
        entries={entries}
        onContinue={handleContinue}
        onStop={handleStop}
        onRemove={handleRemove}
        onChange={handleChange}
      />
    </div>
  );
}

export default HomePage;
