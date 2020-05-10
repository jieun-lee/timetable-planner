import React from 'react';
import { ICourse } from '../util/DataTypes';
import CoursesView from './CoursesView';
import AddSection from './AddSection';
import '../styles/CoursesSidePanel.scss';

interface CoursesSidePanelProps {
  courses: ICourse[],
  addCourse: Function,
  addSection: Function
}

interface CoursesSidePanelState {
  isViewSelected: boolean
}

class CoursesSidePanel extends React.Component<CoursesSidePanelProps, CoursesSidePanelState> {
  constructor(props: CoursesSidePanelProps) {
    super(props);
    this.state = {
      isViewSelected: true
    }
    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent(): void {
    this.setState((prevState: CoursesSidePanelState) => ({
      isViewSelected: !prevState.isViewSelected
    }));
  }

  render() {
    let content: JSX.Element;
    let viewButton: JSX.Element;
    let addButton: JSX.Element;
    if (this.state.isViewSelected) {
      content = <CoursesView courses={this.props.courses} />;
      viewButton = <div className="courses-side-panel__content__toggle__button">View</div>
      addButton = <div
        onClick={this.toggleContent}
        className="courses-side-panel__content__toggle__button
          courses-side-panel__content__toggle__button--deselected">Add</div>
    } else {
      content = <AddSection
        courses={this.props.courses}
        addCourse={this.props.addCourse}
        addSection={this.props.addSection}
        togglePanel={this.toggleContent}
      />;
      addButton = <div className="courses-side-panel__content__toggle__button">Add</div>
      viewButton = <div
        onClick={this.toggleContent}
        className="courses-side-panel__content__toggle__button
          courses-side-panel__content__toggle__button--deselected">View</div>
    }
    return (
      <div className="courses-side-panel">
        <div className="courses-side-panel__header">Courses</div>
        <div className="courses-side-panel__content">
          <div className="courses-side-panel__content__toggle">
            { viewButton }
            { addButton }
          </div>
          { content }
        </div>
      </div>
    );
  }
}

export default CoursesSidePanel;
