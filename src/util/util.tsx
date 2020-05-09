import { Day } from "./DataTypes";

export function getShortDayName(day: number) {
  return Day[day].substring(0, 3);
}
