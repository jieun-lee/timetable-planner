import React from 'react';
import { ICourse } from './util/DataTypes';
import { getNextMockCourse } from './util/CourseManager';
import Timetable from './components/Timetable';
import CourseList from './components/CourseList';
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
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
          <Timetable />
          <button onClick={this.handleClick}>Add</button>
          <CourseList />
      </div>
    );
  }
}

export default App;
