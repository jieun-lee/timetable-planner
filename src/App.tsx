import React from 'react';
import Timetable from './components/Timetable';
import CourseList from './components/CourseList';
import './styles/App.scss';

enum Day { Monday, Tuesday, Wednesday, Thursday, Friday }

interface ICourse {
  name: string,
  sections: ISection[]
}

interface ISection {
  id: string,
  times: ITime[]
}

interface ITime {
  day: Day,
  startTime: number,
  endTime: number
}

interface AppProps {}

interface AppState {
  name: string,
  courses: ICourse[]
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: "Test",
      courses: [],
    }
    this.addCourse = this.addCourse.bind(this);
  }

  makeSampleCourse() {
    let sampleCourse: ICourse = {
      name: "CPSC 110",
      sections: [{
        id: "103",
        times: [{
          day: Day.Monday,
          startTime: 10,
          endTime: 11
        },{
          day: Day.Wednesday,
          startTime: 10,
          endTime: 11
        }, {
          day: Day.Friday,
          startTime: 10,
          endTime: 11
        }]
      }]
    }
    return sampleCourse;
  }

  addCourse() {
    let courseList: ICourse[] = this.state.courses;
    let course: ICourse = this.makeSampleCourse();
    courseList.push(course);
    this.setState((prevState: string) => ({
      name: prevState,
      courses: courseList
    }))
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
          <Timetable />
          <button onClick={this.addCourse}>Add</button>
          <CourseList />
      </div>
    );
  }
}

export default App;
