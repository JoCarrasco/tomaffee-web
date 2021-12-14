import React from 'react';
import { TimeEntryButtonComponent, TimeEntryListGroupComponent, TimeEntryService } from './core';
import './App.scss';

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
