import React from 'react';
import { ICourse, ISection, ITime, Status } from "../util/DataTypes";
import { getShortDayName, getTimeLabel } from "../util/util";

interface CoursesViewProps {
  courses: ICourse[]
}

class CoursesView extends React.Component<CoursesViewProps> {

  renderSectionTime(time: ITime): JSX.Element {
    return (
      <div className="courses-view__course__section__time" key={time.day.toString()+time.startTime}>
        <div className="courses-view__course__section__time__day">{ getShortDayName(time.day) }</div>
        <div className="courses-view__course__section__time__time">{ getTimeLabel(time.startTime, time.duration) }</div>
      </div>
    );
  }

  renderSection(course: string, section: ISection): JSX.Element {
    let timeElements: JSX.Element[] = [];
    for (let time of section.times) {
      timeElements.push(this.renderSectionTime(time));
    }
    return (
      <div className={`courses-view__course__section courses-view__course__section--${Status[section.status]}`} key={section.id}>
        <p className="courses-view__course__section__label">{ course + " " + section.id }</p>
        { timeElements }
      </div>
    )
  }

  renderCourse(course: ICourse): JSX.Element {
    let sectionElements: JSX.Element[] = [];
    for (let section of course.sections) {
      sectionElements.push(this.renderSection(course.name, section));
    }
    return (
      <div className="courses-view__course" key={ course.name }>
        <p className="courses-view__course__name">{ course.name }</p>
        { sectionElements }
      </div>
    );
  }

  render() {
    let courseElements: JSX.Element[] = [];
    for (let course of this.props.courses) {
      courseElements.push(this.renderCourse(course));
    }

    return (
      <div className="courses-side-panel__sub-content courses-view">
        { courseElements }
      </div>
    );
  }
}

export default CoursesView;
