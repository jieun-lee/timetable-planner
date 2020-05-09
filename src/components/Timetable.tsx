import React from 'react';
import { ICourse, ITimetableSection, ISectionsByDay, Day, Status } from '../util/DataTypes';
import TimetableDay from './TimetableDay';
import '../styles/Timetable.scss';

interface TimetableProps {
  courses: ICourse[]
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
            name: course.name,
            section: section.id,
            startTime: time.startTime,
            duration: time.duration,
            status: Status.Deselected
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
        <TimetableDay day="Monday" sections={sections.monday} />
        <TimetableDay day="Tuesday" sections={sections.tuesday} />
        <TimetableDay day="Wednesday" sections={sections.wednesday} />
        <TimetableDay day="Thursday" sections={sections.thursday} />
        <TimetableDay day="Friday" sections={sections.friday} />
      </div>
    );
  }
}

export default Timetable;
