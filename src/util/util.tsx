import { Day } from "./DataTypes";

export function getShortDayName(day: number) {
  return Day[day].substring(0, 3);
}

export function getTimeLabel(start: number, duration: number) {
  let timeStr: string = (Math.floor(start) === start) ? start + ":00" : Math.floor(start) + ":30";
  let end: number = start + duration;
  timeStr += " - ";
  timeStr += (Math.floor(end) === end) ? end + ":00" : Math.floor(end) + ":30";
  return timeStr;
}
