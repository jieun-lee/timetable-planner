import React from 'react';
import TimetableDay from './TimetableDay';
import '../styles/Timetable.scss';

class Timetable extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      classes: null
    }
  }

  render() {
    return (
      <div className="timetable">
        <TimetableDay Day="Monday" />
        <TimetableDay Day="Tuesday" />
        <TimetableDay Day="Wednesday" />
        <TimetableDay Day="Thursday" />
        <TimetableDay Day="Friday" />
      </div>
    );
  }
}

export default Timetable;
