import React from 'react';
import { ICourse, ITimetableSection, ISectionsByDay, Day } from '../util/DataTypes';
import TimetableDay from './TimetableDay';
import '../styles/Timetable.scss';

interface TimetableProps {
  courses: ICourse[],
  setSectionStatus: Function
}

class Timetable extends React.Component<TimetableProps> {

  getSectionsByDay(courses: ICourse[]): ISectionsByDay {
    let allSections: ISectionsByDay = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    }
    for (let course of courses) {
      for (let section of course.sections) {
        for (let time of section.times) {
          let ttSection: ITimetableSection = {
            course: course.name,
            id: section.id,
            startTime: time.startTime,
            duration: time.duration,
            status: section.status
          }
          switch (time.day) {
            case Day.Monday:
              allSections.monday.push(ttSection);
              break;
            case Day.Tuesday:
              allSections.tuesday.push(ttSection);
              break;
            case Day.Wednesday:
              allSections.wednesday.push(ttSection);
              break;
            case Day.Thursday:
              allSections.thursday.push(ttSection);
              break;
            case Day.Friday:
              allSections.friday.push(ttSection);
              break;
          }
        }
      }
    }
    return allSections;
  }

  render() {
    let sections: ISectionsByDay = this.getSectionsByDay(this.props.courses);
    return (
      <div className="timetable">
        <TimetableDay day="Monday" sections={sections.monday} setSectionStatus={this.props.setSectionStatus} />
        <TimetableDay day="Tuesday" sections={sections.tuesday} setSectionStatus={this.props.setSectionStatus} />
        <TimetableDay day="Wednesday" sections={sections.wednesday} setSectionStatus={this.props.setSectionStatus} />
        <TimetableDay day="Thursday" sections={sections.thursday} setSectionStatus={this.props.setSectionStatus} />
        <TimetableDay day="Friday" sections={sections.friday} setSectionStatus={this.props.setSectionStatus} />
      </div>
    );
  }
}

export default Timetable;
