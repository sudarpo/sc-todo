import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import InitialTasksList from "./tempDummyList.json";

export default class App extends Component {
  state = {
    tasksList: InitialTasksList,
    taskToEdit: {},
  };

  handleTaskComplete = (task) => {
    const allTasks = [...this.state.tasksList];
    const index = allTasks.findIndex((t) => t.id === task.id);
    const task1 = { ...allTasks[index] };
    task1.completed = true;
    allTasks[index] = task1;
    this.setState({ tasksList: allTasks });
  };

  handleTaskDelete = (task) => {
    let filtered = [...this.state.tasksList].filter((t) => t.id !== task.id);
    this.setState({ tasksList: filtered });
  };

  handleTaskEdit = (task) => {
    this.setState({ taskToEdit: { ...task } });
  };

  handleSubmit = (task) => {
    // console.log("Submit", task);
    if (task.id === 0) {
      task.id = Date.now() * 2;
      const allTasks = [...this.state.tasksList, task];
      this.setState({ tasksList: allTasks });
    } else {
      let allTasks = [...this.state.tasksList];
      let index = allTasks.findIndex((t) => t.id === task.id);
      let taskToUpdate = { ...allTasks[index] };
      taskToUpdate.title = task.title;
      allTasks[index] = taskToUpdate;
      this.setState({ tasksList: allTasks, taskToEdit: {} });
    }
  };

  render() {
    const { tasksList, taskToEdit } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <ToDoList
              tasksList={tasksList}
              onTaskComplete={this.handleTaskComplete}
              onTaskDelete={this.handleTaskDelete}
              onTaskEdit={this.handleTaskEdit}
            />
          </div>
          <div className="col">
            <ToDoForm onSubmit={this.handleSubmit} task={taskToEdit} />
          </div>
        </div>
      </div>
    );
  }
}
