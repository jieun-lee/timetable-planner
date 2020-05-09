import React from 'react';
import { ITimeSegment } from '../util/DataTypes';

function TimeSegment(props: ITimeSegment) {
  let classList: string = "time-segment";
  let isContinued: boolean = false; // handle this properly
  let title: string = "";
  // let status: Status = Status.Undefined;
  if (props.sections.length > 0) {
    // handle sections - just do first one for now
    if (props.sections[0].startTime < props.startTime) {
      isContinued = true;
    } else {
      title = props.sections[0].name + " " + props.sections[0].section;
      // status = props.sections[0].status;
    }
    classList = classList + " time-segment--deselected";
  } else {
    isContinued = Math.floor(props.startTime) < props.startTime;
    if (!isContinued) {
      title = props.startTime + ":00";
    }
    classList = classList + " time-segment--empty";
  }
  if (isContinued) {
    classList = classList + " time-segment--half"; // need to change
  }

  return (
    <div className={classList}>
      <span>
        { title }
      </span>
    </div>
  )
}

export default TimeSegment;
