import { observer } from "mobx-react";
import React from "react";
import mobxStore from "../../mobx-store/mobx-store";
import { Button, Dropdown, Form, Table } from "semantic-ui-react";

const searchOptions = [
  { key: 1, text: "", value: null },
  { key: 2, text: "Done", value: true },
  { key: 3, text: "Not Done", value: false },
];

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.store = mobxStore.taskStore;
  }

  async componentDidMount() {
    await this.store.getAllTasks();
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group inline>
            <Form.Input
              placeholder="Description"
              id="desc"
              autoComplete="off"
              label="Description"
              value={this.store.search.desc}
              onChange={(event, data) => {
                this.store.changeSearch(data);
              }}
            ></Form.Input>
            <Dropdown
              placeholder="Status"
              id="status"
              options={searchOptions}
              selection
              value={this.store.search.status}
              onChange={(event, data) => {
                this.store.changeSearch(data);
              }}
            />
            <Button primary onClick={this.store.searchTasks}>
              Search
            </Button>
            <Button
              secondary
              onClick={() => {
                this.store.resetSearch();
                this.store.searchTasks();
              }}
            >
              Reset
            </Button>
          </Form.Group>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Task ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.store.tasks.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan="3" textAlign="center">
                <h3> No data</h3>
              </Table.Cell>
            </Table.Row>
          )}
          {this.store.tasks.length > 0 && (
            <Table.Body>
              {this.store.tasks.map((task, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{task.taskID}</Table.Cell>
                    <Table.Cell>{task.description}</Table.Cell>
                    <Table.Cell>
                      <input
                        type="checkbox"
                        checked={task.status}
                        onChange={() => {
                          this.store.updateTaskStatus(task);
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          )}
        </Table>
      </>
    );
  }
}

export default observer(TaskList);
