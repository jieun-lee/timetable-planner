import React from 'react';
import '../styles/CoursesSidePanel.scss';

interface CoursesSidePanelProps {
  //
}

interface CoursesSidePanelState {
  showContent: boolean
}

class CoursesSidePanel extends React.Component<CoursesSidePanelProps, CoursesSidePanelState> {
  constructor(props: CoursesSidePanelProps) {
    super(props);
    this.state = {
      showContent: false
    }
    this.toggleContentDisplay = this.toggleContentDisplay.bind(this);
  }

  toggleContentDisplay(): void {
    this.setState((prevState: CoursesSidePanelState) => ({
      showContent: !prevState.showContent
    }));
  }

  render() {
    return (
      <div className="courses-side-panel">
        <div className="courses-side-panel__header" onClick={this.toggleContentDisplay}>Manage Courses</div>
        { this.state.showContent && <div className="courses-side-panel__content">List of Courses</div> }
        
      </div>
    );
  }
}

export default CoursesSidePanel;
