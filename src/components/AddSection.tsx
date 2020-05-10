import React from 'react';
import { ITime, Day } from '../util/DataTypes';

interface AddSectionProps {}

interface AddSectionState {
  course: string,
  section: string,
  times: ITime[],
}

class AddSection extends React.Component<AddSectionProps, AddSectionState> {
  constructor(props: AddSectionProps) {
    super(props);
    this.state = {
      course: "",
      section: "",
      times: []
    }
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleMeetingDayChange = this.handleMeetingDayChange.bind(this);
    this.handleMeetingTimeChange = this.handleMeetingTimeChange.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
  }

  handleClick() {
    // CHECK - has at least one meeting time
    // CHECK - for each meeting time, the end time > start time
    // get existing course OR create new course object
    // add section to the course
    // switch to VIEW on the courses side panel
  }

  handleCourseChange(event: React.ChangeEvent<HTMLInputElement>) {
    let courseString: string = event.target.value;
    this.setState((prevState: AddSectionState) => ({
      course: courseString,
      section: prevState.section,
      times: prevState.times,
    }));
  }

  handleSectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    let sectionString: string = event.target.value;
    this.setState((prevState: AddSectionState) => ({
      course: prevState.course,
      section: sectionString,
      times: prevState.times,
    }));
  }

  handleMeetingDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let eventId: number = +event.target.id;
    let newTimes: ITime[] = this.state.times;
    newTimes[eventId].day = +event.target.value;
    this.setState((prevState: AddSectionState) => ({
      course: prevState.course,
      section: prevState.section,
      times: newTimes,
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
    this.setState((prevState: AddSectionState) => ({
      course: prevState.course,
      section: prevState.section,
      times: newTimes,
    }));
  }

  addMeeting(): void {
    let newTime: ITime = {
      day: Day.Monday,
      startTime: 8,
      duration: 1
    }
    let newTimes: ITime[] = this.state.times;
    newTimes.push(newTime);
    this.setState((prevState: AddSectionState) => ({
      course: prevState.course,
      section: prevState.section,
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
      <div key={id}>
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
        <input type="text" name="course-name" value={this.state.course} onChange={this.handleCourseChange} placeholder="Course Name" />
        <input type="text" name="section-id" value={this.state.section} onChange={this.handleSectionChange} placeholder="Section ID" />
        { meetingFields }
        <button onClick={this.addMeeting}>Add Meeting Time</button>
        <button onClick={this.handleClick}>Add Section</button>
      </div>
    );
  }
}

export default AddSection;
