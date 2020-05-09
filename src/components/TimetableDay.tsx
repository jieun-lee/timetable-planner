import React from 'react';
import TimeSegment from './TimeSegment';

interface TimetableDayProps {
  day: string
  // StartTime: number
  // EndTime: number
}

interface TimetableDayState {
  startTime: number
  endTime: number
}

class TimetableDay extends React.Component<TimetableDayProps, TimetableDayState> {
  constructor(props: TimetableDayProps) {
    super(props);
    this.state = {
      startTime: 9,
      endTime: 15 // keep fixed for now
    }
  }

  render() {
    let timeSegments = [];
    let time: number = this.state.startTime;
    while (time < this.state.endTime) {
      timeSegments.push(<TimeSegment key={time} startTime={time} />);
      time = time + 0.5;
    }
    for (var i = this.state.startTime; i < this.state.endTime; i++) {
      
    }
    return (
      <div className="timetable-day">
        <div className="timetable-day__header">{ this.props.day }</div>
        <div className="timetable-day__schedule">
          { timeSegments }
        </div>
      </div>
    );
  }
}

export default TimetableDay;
