import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimeEntryButton from './core/components/TImeEntry/TimeEntryButton/TimeEntryButton';

function App() {
  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <p>Push button to create time entry</p>
      <TimeEntryButton />
    </div>
  );
}

export default App;
