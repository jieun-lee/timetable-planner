import React from 'react';
import Timetable from './components/Timetable';
import ClassList from './components/ClassList';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
        <Timetable />
        <ClassList />
    </div>
  );
}

export default App;
