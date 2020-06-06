import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import InitialTasksList from "./tempDummyList.json";

export default class App extends Component {
  state = {
    Tasks: InitialTasksList,
  };

  handleTaskComplete = (task) => {
    const allTasks = [...this.state.Tasks];
    const index = allTasks.findIndex((t) => t.id === task.id);
    const task1 = { ...allTasks[index] };
    task1.completed = true;
    allTasks[index] = task1;
    this.setState({ Tasks: allTasks });
  };

  handleTaskDelete = (task) => {
    let filtered = [...this.state.Tasks].filter((t) => t.id !== task.id);
    this.setState({ Tasks: filtered });
  };

  handleTaskEdit = (task) => {
    console.log("Edit", task);
  };

  render() {
    const { Tasks } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <ToDoList
              Tasks={Tasks}
              onTaskComplete={this.handleTaskComplete}
              onTaskDelete={this.handleTaskDelete}
              onTaskEdit={this.handleTaskEdit}
            />
          </div>
          <div className="col">
            <h1>INPUT FORM HERE</h1>
          </div>
        </div>
      </div>
    );
  }
}
