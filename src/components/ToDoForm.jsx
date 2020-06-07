import React, { Component } from "react";
import InputControl from "./common/inputControl";

export default class ToDoForm extends Component {
  state = {
    taskTitle: "",
  };

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  componentDidUpdate = () => {
    console.log(this.state.taskTitle, "componentDidUpdate", this.props.task);
  };

  handleChange = (e) => {
    this.setState({ taskTitle: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { taskTitle } = this.state;
    if (taskTitle.trim().length === 0) return;

    this.props.onSubmit({ title: taskTitle, id: 0 });
    this.setState({ task: "" });
  };

  render() {
    console.log(this.state.taskTitle, "render", this.props.task);

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-header">New Task</div>
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
