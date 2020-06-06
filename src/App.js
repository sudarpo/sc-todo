import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import InitialTasksList from "./tempDummyList.json";

export default class App extends Component {
  state = {
    Tasks: InitialTasksList,
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>INPUT FORM HERE</h1>
          </div>
          <div className="col">
            <ToDoList Tasks={this.state.Tasks} />
          </div>
        </div>
      </div>
    );
  }
}
