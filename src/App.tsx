import React from 'react';
import { TimeEntryButtonComponent, TimeEntryListGroupComponent, TimerService } from './core';
import './App.scss';

function App() {
  TimerService.initialize();
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
