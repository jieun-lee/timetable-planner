import React from 'react';

interface TimeSegmentProps {
  startTime: number
}

function TimeSegment(props: TimeSegmentProps) {
  let isHalfTime: boolean = Math.floor(props.startTime) < props.startTime;
  let isContinued: boolean = false; // make dynamic
  let boxContent = "";
  let classList: string = "time-segment";
  if (isHalfTime) {
    classList = classList + " time-segment--half";
    isContinued = true;
  }
  if (isContinued) {
    boxContent = "";
  } else {
    boxContent = props.startTime + ":00";
  }
  return (
    <div className={classList}>
      <span>
        { boxContent }
      </span>
    </div>
  )
}

export default TimeSegment;
