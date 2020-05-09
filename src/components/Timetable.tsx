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
        <TimetableDay day="Monday" />
        <TimetableDay day="Tuesday" />
        <TimetableDay day="Wednesday" />
        <TimetableDay day="Thursday" />
        <TimetableDay day="Friday" />
      </div>
    );
  }
}

export default Timetable;
