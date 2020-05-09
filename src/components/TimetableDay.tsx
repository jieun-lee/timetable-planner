import React from 'react';

interface TimetableDayProps {
  Day: string
}

class TimetableDay extends React.Component<TimetableDayProps> {
  render() {
    return (
      <div className="timetable-day">
        <div className="timetable-day__header">{ this.props.Day }</div>
      </div>
    );
  }
}

export default TimetableDay;
