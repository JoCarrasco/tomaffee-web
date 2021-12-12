import React from 'react';
import { TimeEntryButtonComponent } from './core/components';
import './App.scss';
import { TimeEntryService } from './core/services/time-entry/time-entry.service';
import { TimeEntryListGroupComponent } from './core/components/TimeEntry/TimeEntryListGroup/TimeEntryListGroup.component';
function App() {
  TimeEntryService.init();
  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p>Push button to create time entry</p>
      <TimeEntryButtonComponent />
      <TimeEntryListGroupComponent />
    </div>
  );
}

export default App;
