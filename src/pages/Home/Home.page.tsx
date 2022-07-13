import { useEffect } from "react";
import { TimeEntryService, TimeEntryListComponent } from "../../core";
import { useTimeEntries } from "../../core/hooks";

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

  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p onClick={() => TimeEntryService.createNewEntry()}>Push button to create time entry</p>
      {/* <TimeEntryButtonComponent /> */}
      <TimeEntryListComponent
        entries={entries}
        onContinue={handleContinue}
        onStop={handleStop}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default HomePage;
