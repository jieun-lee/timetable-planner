export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday
}

export enum Status {
  Selected,
  Deselected,
  Disabled
}

export interface ICourse {
  name: string,
  sections: ISection[]
}

export interface ISection {
  id: string,
  status: Status,
  times: ITime[]
}

export interface ITime {
  day: Day,
  startTime: number,
  duration: number
}

export interface ITimetableSection {
  name: string,
  section: string,
  startTime: number,
  duration: number,
  status: Status
}

export interface ISectionsByDay {
  monday: ITimetableSection[],
  tuesday: ITimetableSection[],
  wednesday: ITimetableSection[],
  thursday: ITimetableSection[],
  friday: ITimetableSection[]
}

export interface ITimeSegment {
  startTime: number,
  sections: ITimetableSection[]
}
