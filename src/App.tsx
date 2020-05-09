import React from 'react';
import { ICourse } from './util/DataTypes';
import { getNextMockCourse } from './util/CourseManager';
import Timetable from './components/Timetable';
import CoursesSidePanel from './components/CoursesSidePanel';
import './styles/App.scss';

interface AppProps {}

interface AppState {
  name: string,
  courses: ICourse[]
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: "Student",
      courses: [getNextMockCourse()],
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // for testing
  handleClick() {
    let course: ICourse = getNextMockCourse();
    this.addCourse(course);
  }

  // adds given course to course list
  addCourse(course: ICourse) {
    let courseList: ICourse[] = this.state.courses;
    courseList.push(course);
    this.setState((prevState: AppState) => ({
      name: prevState.name,
      courses: courseList
    }));
  }

  render() {
    return (
      <div className="App">
          <Timetable courses={this.state.courses} />
          <button className="testing-button" onClick={this.handleClick}>Add</button>
          <CoursesSidePanel />
      </div>
    );
  }
}

export default App;
