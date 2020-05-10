import React from 'react';
import { ITimetableSection, Status } from '../util/DataTypes';
import { getTimeLabel } from '../util/util';

interface TimeSegmentProps {
  startTime: number,
  sections: ITimetableSection[],
  setSectionStatus: Function
}

class TimeSegment extends React.Component<TimeSegmentProps> {
  constructor(props: TimeSegmentProps) {
    super(props);
    this.handleSectionClick = this.handleSectionClick.bind(this);
  }

  handleSectionClick(sectionId: string) {
    for (let section of this.props.sections) {
      if (section.section === sectionId) {
        let status: Status = section.status === Status.Deselected ? Status.Selected : Status.Deselected;
        this.props.setSectionStatus(section.name, sectionId, status);
        return;
      }
    }
  }

  // CURRENT ASSUMPTIONS:
  // - no overlaps (this.props.sections.length <= 1)
  // - only render courses that start at this time segment
  render() {
    let courseEls: JSX.Element[]  = [];
    if (this.props.sections.length > 0) {
      for (let index in this.props.sections) {
        if (this.props.sections[index].startTime === this.props.startTime) {
          let section = this.props.sections[index];
          let elStyle: object = { height: ((section.duration / 0.5) * 100) + "%" };
          let classList = "time-segment__course";
          switch(section.status) {
            case Status.Selected:
              classList = classList + " time-segment__course--selected";
              break;
            case Status.Disabled:
              classList = classList + " time-segment__course--disabled";
              break;
          }
          courseEls.push(<div className={classList} style={elStyle} key={index} onClick={()=>this.handleSectionClick(section.section)}>
            <div className="time-segment__course__label">{ section.name + " " + section.section }</div>
            <div className="time-segment__course__time">{ getTimeLabel(section.startTime, section.duration) }</div>
          </div>);
        }
      }      
    }
    // setup for background timetable
    let classList: string = "time-segment";
    let timeLabel: string = "";
    if (Math.floor(this.props.startTime) < this.props.startTime) {
      classList = classList + " time-segment--mid-hour";
    } else {
      timeLabel = this.props.startTime + ":00";
    }
    // render components
    return (
      <div className={classList}>
        { courseEls }
        <span>
          { timeLabel }
        </span>
      </div>
    )
  }
}

export default TimeSegment;
