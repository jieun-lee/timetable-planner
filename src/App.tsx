import React from 'react';
import { ICourse, ISection, Status } from './util/DataTypes';
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
    this.addCourse = this.addCourse.bind(this);
    this.addSectionToCourse = this.addSectionToCourse.bind(this);
    this.setSectionStatus = this.setSectionStatus.bind(this);
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

  // adds given section to given course
  addSectionToCourse(courseIndex: number, section: ISection) {
    this.state.courses[courseIndex].sections.push(section);
    this.setState((prevState: AppState) => ({
      courses: prevState.courses
    }));
  }

  setSectionStatus(courseName: string, sectionId: string, status: Status) {
    for (let course of this.state.courses) {
      if (course.name === courseName) {
        for (let section of course.sections) {
          if (section.id === sectionId) {
            section.status = status;
            this.setState((prevState: AppState) => ({
              courses: prevState.courses
            }));
            return;
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
          <Timetable courses={this.state.courses} setSectionStatus={this.setSectionStatus} />
          <button className="testing-button" onClick={this.handleClick}>Add</button>
          <CoursesSidePanel courses={this.state.courses} addCourse={this.addCourse} addSection={this.addSectionToCourse} />
      </div>
    );
  }
}

export default App;
