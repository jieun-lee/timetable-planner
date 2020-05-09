import React from 'react';
import TimeSegment from './TimeSegment';
import { ITimetableSection, ITimeSegment } from '../util/DataTypes';

interface TimetableDayProps {
  day: string
  sections: ITimetableSection[]
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
      endTime: 16 // keep fixed for now
    }
  }

  makeSegments(): ITimeSegment[] {
    let timeSegments: ITimeSegment[] = [];
    let time: number = this.state.startTime;
    while (time < this.state.endTime) {
      timeSegments.push({
        startTime: time,
        sections: []
      });
      time = time + 0.5;
    }
    return timeSegments;
  }

  addSectionsToSegments(segments: ITimeSegment[], sections: ITimetableSection[]) {
    for (let section of sections) {
      for (let seg in segments) {
        if (segments[seg].startTime === section.startTime) {
          let offset: number = 0;
          let remainingTime: number = section.duration;
          while (remainingTime > 0) {
            segments[+seg + offset].sections.push(section);
            offset++;
            remainingTime -= 0.5;
          }
          break;
        }
      }
    }
  }

  render() {
    let timeSegments: ITimeSegment[] = this.makeSegments();
    this.addSectionsToSegments(timeSegments, this.props.sections);
    let segmentComponents = [];
    for (let segment of timeSegments) {
      segmentComponents.push(
        <TimeSegment
          key={segment.startTime}
          startTime={segment.startTime}
          sections={segment.sections}
        />
      );
    }
    return (
      <div className="timetable-day">
        <div className="timetable-day__header">{ this.props.day }</div>
        <div className="timetable-day__schedule">
          { segmentComponents }
        </div>
      </div>
    );
  }
}

export default TimetableDay;
