import React from 'react';

interface AddSectionProps {}

interface AddSectionState {
  numMeetings: number
}

class AddSection extends React.Component<AddSectionProps, AddSectionState> {
  constructor(props: AddSectionProps) {
    super(props);
    this.state = {
      numMeetings: 0 // gets reset on reload
    }
    this.addMeeting = this.addMeeting.bind(this);
  }

  renderTimePicker(type: "start" | "end", id: number): JSX.Element {
    return (
      <div>
        <select name={`meeting-${id}-time-${type}-h`}>
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
        <select name={`meeting-${id}-time-${type}-m`}>
          <option value={0}>00</option>
          <option value={0.5}>30</option>
        </select>
      </div>
    );
  }

  renderMeetingPicker(id: number): JSX.Element {
    return (
      <div key={id}>
        <select name={`meeting-${id}-day`}>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>
        { this.renderTimePicker("start", id) }
        { this.renderTimePicker("end", id) }
    </div>
    );
  }

  addMeeting(): void {
    this.setState((prevState: AddSectionState) => ({
      numMeetings: prevState.numMeetings + 1
    }));
  }

  handleClick() {
    // CHECK - has at least one meeting time
    // CHECK - for each meeting time, the end time > start time
    // get existing course OR create new course object
    // add section to the course
    // switch to VIEW on the courses side panel
  }

  render() {
    let meetingFields: JSX.Element[] = [];
    for (let i = 0; i < this.state.numMeetings; i++) {
      meetingFields.push(this.renderMeetingPicker(i));
    }

    return (
      <div className="courses-side-panel__sub-content courses-add">
        <input type="text" name="course-name" placeholder="Course Name" />
        <input type="text" name="section-id" placeholder="Section ID" />
        { meetingFields }
        <button onClick={this.addMeeting}>Add Meeting Time</button>
        <button onClick={this.handleClick}>Add Section</button>
      </div>
    );
  }
}

export default AddSection;
