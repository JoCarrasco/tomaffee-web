import { useEffect } from "react";
import { TimeEntryService, TimeEntryListComponent } from "../../core";
import { useTimeEntries } from '../../core/hooks';

function HomePage() {
  const entries = useTimeEntries();

  useEffect(() => {
 
  }, [entries]);

  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p onClick={() => TimeEntryService.createNewEntry()}>
        Push button to create time entry
      </p>
      {/* <TimeEntryButtonComponent /> */}
      <TimeEntryListComponent
        entries={entries}
        onContinue={TimeEntryService.continueTimeEntry}
        onStop={TimeEntryService.stopTimeEntry}
        onRemove={TimeEntryService.removeTimeEntry}
        onChange={TimeEntryService.updateTimeEntry}
      />
    </div>
  );
}

export default HomePage;
