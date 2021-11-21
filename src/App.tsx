import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimeEntryButton from './core/components/TImeEntry/TimeEntryButton/TimeEntryButton';
import { TimeEntryList } from './core/components/TImeEntry/TimeEntryList/TimeEntryList';

function App() {
  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p>Push button to create time entry</p>
      <TimeEntryButton />
      <TimeEntryList />
    </div>
  );
}

export default App;
