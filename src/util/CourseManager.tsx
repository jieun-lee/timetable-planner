import { Day, ICourse } from './DataTypes';

export function getNextMockCourse() {
  let mockCourseId: number = mockCourseCount % mockCourses.length;
  mockCourseCount++;
  return mockCourses[mockCourseId];
}

let mockCourseCount: number = 0;
let mockCourses: ICourse[] = [
  {
    name: "CPSC 110",
    sections: [{
      id: "103",
      times: [{
        day: Day.Monday,
        startTime: 10,
        duration: 1
      },{
        day: Day.Wednesday,
        startTime: 10,
        duration: 1
      }, {
        day: Day.Friday,
        startTime: 10,
        duration: 1
      }]
    }]
  },
  {
    name: "CPSC 121",
    sections: [{
      id: "101",
      times: [{
        day: Day.Tuesday,
        startTime: 11,
        duration: 1.5
      },{
        day: Day.Thursday,
        startTime: 11,
        duration: 1.5
      }]
    }]
  },
  {
    name: "MATH 200",
    sections: [{
      id: "110B",
      times: [{
        day: Day.Monday,
        startTime: 13,
        duration: 1
      },{
        day: Day.Wednesday,
        startTime: 13,
        duration: 1
      }, {
        day: Day.Friday,
        startTime: 13,
        duration: 1
      }]
    }]
  }
]
