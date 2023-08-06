import React from "react";
import mobxStore from "../../mobx-store/mobx-store";
import { Segment, Tab } from "semantic-ui-react";
import { observer } from "mobx-react";
import TaskList from "../task-list";
import Task from "../task";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = mobxStore.taskStore;
    this.state = {
      tabIndex: 0,
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(event) {
    this.setState((prevState) => ({
      ...prevState,
      tabIndex: event.activeIndex,
    }));
  }

  panes = [
    {
      menuItem: "Task List",
      render: () => (
        <Tab.Pane>
          <TaskList />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Add Task",
      render: () => (
        <Tab.Pane>
          <Task />
        </Tab.Pane>
      ),
    },
  ];

  render() {
    return (
      <>
        <Segment.Group>
          <Segment inverted color="blue">
            <h2>Task Manager</h2>
          </Segment>
          <Segment>
            <Tab
              activeIndex={this.state.tabIndex}
              panes={this.panes}
              onTabChange={this.onTabChange}
            />
          </Segment>
        </Segment.Group>
      </>
    );
  }
}

export default observer(Home);
