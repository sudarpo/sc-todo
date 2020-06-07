import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import InitialTasksList from "./tempDummyList.json";

export default class App extends Component {
  state = {
    tasksList: InitialTasksList,
    taskToEdit: { id: 0 },
  };

  toggleCompleteTask = (task) => {
    const allTasks = [...this.state.tasksList];
    const index = allTasks.findIndex((t) => t.id === task.id);
    const task1 = { ...allTasks[index] };
    task1.completed = !task.completed;
    allTasks[index] = task1;
    this.setState({ tasksList: allTasks });
  };

  handleTaskComplete = (task) => {
    this.toggleCompleteTask(task);
  };

  handleTaskUndoComplete = (task) => {
    this.toggleCompleteTask(task);
  };

  handleTaskDelete = (task) => {
    let filtered = [...this.state.tasksList].filter((t) => t.id !== task.id);
    this.setState({ tasksList: filtered });
    if (task.id === this.state.taskToEdit.id) {
      this.setState({ taskToEdit: { id: 0, deleted: true } });
    }
  };

  handleTaskEdit = (task) => {
    this.setState({ taskToEdit: { ...task } });
  };

  handleSubmit = (task) => {
    // console.log("Submit", task);
    const filteredTask = this.state.tasksList.filter(
      (t) => t.title.trim().toUpperCase() === task.title.trim().toUpperCase()
    );
    if (filteredTask.length > 0) {
      console.error("Duplicate task entered", task.title.trim().toUpperCase());
      return;
    }

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
      this.setState({ tasksList: allTasks, taskToEdit: { id: 0 } });
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
              onTaskUndoComplete={this.handleTaskUndoComplete}
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
