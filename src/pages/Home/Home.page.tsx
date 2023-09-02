import { useEffect, useState } from "react";
import { TimeEntryService, TimeEntryListComponent } from "../../core";
import { ControlTimerComponent } from '../../core/components/controls/Timer/Timer.component';
import { useTimeEntries } from '../../core/hooks';
import { ITimeEntry } from '../../core/models';

function HomePage() {
  const entries = useTimeEntries();
  const [activeTimeEntry, setActiveTimeEntry] = useState<ITimeEntry | undefined>(undefined);
  useEffect(() => {
    setActiveTimeEntry(getUnfinishedTimeEntry());
  }, [entries]);

  function getUnfinishedTimeEntry(): ITimeEntry | undefined {
    return entries.find((x) => x.end === undefined);
  }

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

  function handleStart(title?: string) {
    TimeEntryService.startNewEntry({ title });
  }

  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <ControlTimerComponent
        activeTimeEntry={activeTimeEntry}
        onPause={handleStop}
        onChange={handleChange}
        onStart={handleStart}
      />
      <TimeEntryListComponent
        entries={entries}
        onContinue={handleContinue}
        onRemove={handleRemove}
        onValueChange={handleChange}
      />
    </div>
  );
}

export default HomePage;
