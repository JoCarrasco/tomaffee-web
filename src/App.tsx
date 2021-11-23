import React from 'react';
import logo from './logo.svg';
import { TimeEntryListComponent, TimeEntryButtonComponent } from './core/components';
import './App.scss';
import { TimeEntryService } from './core/services/time-entry/time-entry.service';
function App() {
  TimeEntryService.init();
  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p>Push button to create time entry</p>
      <TimeEntryButtonComponent />
      <TimeEntryListComponent />
    </div>
  );
}

export default App;
