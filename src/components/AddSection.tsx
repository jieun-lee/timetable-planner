import React from 'react';
import { ICourse, ITime, Day, Status } from '../util/DataTypes';

interface AddSectionProps {
  courses: ICourse[],
  addCourse: Function,
  addSection: Function,
  togglePanel: Function
}

interface AddSectionState {
  course: string,
  section: string,
  times: ITime[],
  message: string
}

class AddSection extends React.Component<AddSectionProps, AddSectionState> {
  constructor(props: AddSectionProps) {
    super(props);
    this.state = {
      course: "",
      section: "",
      times: [],
      message: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleMeetingDayChange = this.handleMeetingDayChange.bind(this);
    this.handleMeetingTimeChange = this.handleMeetingTimeChange.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
  }

  updateMessage(msg: string) {
    this.setState(() => ({
      message: msg
    }));
  }

  handleSubmit() {
    // check for blank input values
    if (this.state.course === "") {
      this.updateMessage("Please enter a course name.");
      return;
    } else if (this.state.section === "") {
      this.updateMessage("Please enter a section ID.");
      return;
    }
    // check start time < end time for all meeting times
    for (let time of this.state.times) {
      if (time.duration <= 0) {
        this.updateMessage("Meeting end times must be later than meeting start times.");
        return;
      }
    }
    // check if course exists (need to implement case checking)
    for (let index in this.props.courses) {
      if (this.props.courses[index].name === this.state.course) {
        for (let section of this.props.courses[index].sections) {
          if (section.id === this.state.section) {
            this.updateMessage("Given section already exists for the given course.");
            return;
          }
        }
        // add section to existing course
        this.props.addSection(index, {
          id: this.state.section,
          status: this.props.courses[index].isSelected ? Status.Disabled : Status.Deselected,
          times: this.state.times
        });
        this.props.togglePanel();
        return;
      }
    }
    // create a new course and add it
    let newCourse: ICourse = {
      name: this.state.course,
      isSelected: false,
      sections: [{
        id: this.state.section,
        status: Status.Deselected,
        times: this.state.times
      }]
    };
    this.props.addCourse(newCourse);
    this.props.togglePanel();
  }

  handleCourseChange(event: React.ChangeEvent<HTMLInputElement>) {
    let courseString: string = event.target.value;
    this.setState(() => ({
      course: courseString
    }));
  }

  handleSectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    let sectionString: string = event.target.value;
    this.setState(() => ({
      section: sectionString
    }));
  }

  handleMeetingDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let eventId: number = +event.target.id;
    let newTimes: ITime[] = this.state.times;
    newTimes[eventId].day = +event.target.value;
    this.setState(() => ({
      times: newTimes
    }));
  }

  handleMeetingTimeChange(event: React.ChangeEvent<HTMLSelectElement>, type: "start" | "end", isHour: boolean) {
    let eventId: number = +event.target.id;
    let newVal: string = event.target.value;
    let newTimes: ITime[] = this.state.times;
    let startTime: number = newTimes[eventId].startTime;
    let duration: number = newTimes[eventId].duration;
    let endTime: number = startTime + duration;
    if (type === "start") {
      startTime = isHour ? startTime - Math.floor(startTime) + parseInt(newVal) : Math.floor(startTime) + parseFloat(newVal);
    } else {
      endTime = isHour ? endTime - Math.floor(endTime) + parseInt(newVal) : Math.floor(endTime) + parseFloat(newVal);
    }
    newTimes[eventId].startTime = startTime;
    newTimes[eventId].duration = endTime - startTime;
    this.setState(() => ({
      times: newTimes,
    }));
  }

  addMeeting(): void {
    let newTime: ITime;
    if (this.state.times.length > 0) {
      let lastIndex: number = this.state.times.length - 1;
      newTime = {
        day: this.state.times[lastIndex].day,
        startTime: this.state.times[lastIndex].startTime,
        duration: this.state.times[lastIndex].duration
      }
    } else {
      newTime = {
        day: Day.Monday,
        startTime: 8,
        duration: 1
      }
    }
    let newTimes: ITime[] = this.state.times;
    newTimes.push(newTime);
    this.setState(() => ({
      times: newTimes,
    }));
  }

  renderTimePicker(type: "start" | "end", id: number): JSX.Element {
    let pickerTime: number = (type === "start") ?
      this.state.times[id].startTime :
      this.state.times[id].startTime + this.state.times[id].duration;
    let pickerHr: number = Math.floor(pickerTime);
    let pickerMin: number = pickerTime - pickerHr;
    return (
      <div>
        <label className="courses-add__meeting-time__label">{ type }</label>
        <select
          id={id.toString()}
          value={pickerHr}
          onChange={(event) => this.handleMeetingTimeChange(event, type, true)}
        >
          <option value={8}>08</option>
          <option value={9}>09</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
          <option value={21}>21</option>
        </select>
        <select
          id={id.toString()}
          value={pickerMin}
          onChange={(event) => this.handleMeetingTimeChange(event, type, false)}
        >
          <option value={0}>00</option>
          <option value={0.5}>30</option>
        </select>
      </div>
    );
  }

  renderMeetingPicker(id: number): JSX.Element {
    return (
      <div key={id} className="courses-add__meeting-time">
        <div>
          <label className="courses-add__meeting-time__label">Day</label>
          <select
            id={id.toString()}
            value={this.state.times[id].day}
            onChange={this.handleMeetingDayChange}
          >
            <option value={0}>Monday</option>
            <option value={1}>Tuesday</option>
            <option value={2}>Wednesday</option>
            <option value={3}>Thursday</option>
            <option value={4}>Friday</option>
          </select>
        </div>
        { this.renderTimePicker("start", id) }
        { this.renderTimePicker("end", id) }
    </div>
    );
  }

  componentDidMount() {
    // start with one meeting
    this.addMeeting();
  }

  render() {
    let meetingFields: JSX.Element[] = [];
    for (let i = 0; i < this.state.times.length; i++) {
      meetingFields.push(this.renderMeetingPicker(i));
    }

    return (
      <div className="courses-side-panel__sub-content courses-add">
        <input
          type="text"
          name="course-name"
          value={this.state.course}
          onChange={this.handleCourseChange}
          placeholder="Course Name"
          className="courses-add__input"
        />
        <input
          type="text"
          name="section-id"
          value={this.state.section}
          onChange={this.handleSectionChange}
          placeholder="Section ID"
          className="courses-add__input"
        />
        <div className="courses-add__meeting-wrapper">
          { meetingFields }
          <button className="courses-add__button" onClick={this.addMeeting}>Add Meeting Time</button>
        </div>
        <div className="courses-add__submit">
          { this.state.message.length > 0 && <div className="courses-add__submit__error">{this.state.message}</div> }
          <button className="courses-add__button" onClick={this.handleSubmit}>Add to Course List</button>
        </div>
      </div>
    );
  }
}

export default AddSection;
