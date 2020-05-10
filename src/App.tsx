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
    // CASES TO HANDLE: enable/disable same course sections, overlapping sections
    for (let course of this.state.courses) {
      if (course.name === courseName) {
        // update "isSelected" for the course
        let oppStatus: Status = Status.Deselected;
        if (status === Status.Selected) {
          course.isSelected = true;
          oppStatus = Status.Disabled;
        } else if (status === Status.Deselected) {
          course.isSelected = false;
        }
        for (let section of course.sections) {
          section.status = (section.id === sectionId) ? status : oppStatus;
        }
        this.setState((prevState: AppState) => ({
          courses: prevState.courses
        }));
        return;
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
