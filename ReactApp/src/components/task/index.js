import React from "react";
import mobxStore from "../../mobx-store/mobx-store";
import { Button, Form } from "semantic-ui-react";
import { observer } from "mobx-react";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.store = mobxStore.taskStore;
  }

  render() {
    return (
      <Form style={{ textAlign: "left" }}>
        <Form.TextArea
          id="description"
          label="Description"
          placeholder="Write task description here"
          value={this.store.newTask.description}
          onChange={(event, data) => this.store.changeNewTask(data)}
        />

        <Form.Field>
          <Form.Checkbox
            id="status"
            label="Complete Task"
            checked={this.store.newTask.status}
            onChange={(event, data) => {
              this.store.changeNewTask(data);
            }}
          />
        </Form.Field>
        <Button primary onClick={this.store.addTask}>
          Add Task
        </Button>
      </Form>
    );
  }
}

export default observer(Task);
