export enum Day { Monday, Tuesday, Wednesday, Thursday, Friday }

export interface ICourse {
  name: string,
  sections: ISection[]
}

export interface ISection {
  id: string,
  times: ITime[]
}

export interface ITime {
  day: Day,
  startTime: number,
  duration: number
}
