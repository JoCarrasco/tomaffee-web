import React from 'react';
import { TimeEntryService } from './core';
import HomePage from './pages/Home/Home.page';
import './App.scss';

TimeEntryService.init();

function App() {
  return (
    <div className="App">
      <h6>Tomaffee</h6>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
