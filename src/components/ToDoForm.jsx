import React, { Component } from "react";
import InputControl from "./common/inputControl";

export default class ToDoForm extends Component {
  state = {
    taskTitle: "",
  };

  componentDidUpdate = () => {
    // console.log(this.state.taskTitle, "componentDidUpdate", this.props.task);
    const { task } = this.props;

    if (this.state.taskTitle === "" && task.title) {
      console.log("task title is not undefined OR not empty", task.title);
      this.setState({ taskTitle: task.title });
    }
  };

  handleChange = (e) => {
    this.setState({ taskTitle: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { taskTitle } = this.state;
    if (taskTitle.trim().length === 0) return;

    if (this.props.task.id) {
      this.props.onSubmit({ title: taskTitle, id: this.props.task.id });
    } else {
      this.props.onSubmit({ title: taskTitle, id: 0 });
    }

    this.setState({ taskTitle: "" });
  };

  renderTitle = () => {
    const { task } = this.props;
    return task && task.id === undefined ? "Add New Task" : "Edit Task";
  };

  render() {
    // console.log(this.state.taskTitle, "render", this.props.task);

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-header">{this.renderTitle()}</div>
            <div className="card-body">
              <InputControl
                label="Task Detail"
                name="taskDetail"
                type="text"
                value={this.state.taskTitle}
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}
