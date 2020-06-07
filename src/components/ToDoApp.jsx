import React, { useState } from "react";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import InitialTasksList from "../tempDummyList.json";

const emptyIdZero = { id: 0 };

export default function ToDoApp() {
  const [taskToEdit, setTaskToEdit] = useState(emptyIdZero);
  const [tasksList, setTasks] = useState(InitialTasksList);

  const toggleCompleteTask = (task) => {
    const allTasks = [...tasksList];
    const index = allTasks.findIndex((t) => t.id === task.id);
    const task1 = { ...allTasks[index] };
    task1.completed = !task.completed;
    allTasks[index] = task1;
    setTasks(allTasks);
  };

  const handleTaskComplete = (task) => {
    toggleCompleteTask(task);
  };

  const handleTaskUndoComplete = (task) => {
    toggleCompleteTask(task);
  };

  const handleTaskDelete = (task) => {
    let filtered = [...tasksList].filter((t) => t.id !== task.id);
    setTasks(filtered);
    if (task.id === taskToEdit.id) {
      // this.setState({ taskToEdit: { id: 0, deleted: true } });
      setTaskToEdit({ ...emptyIdZero, deleted: true });
    }
  };

  const handleTaskEdit = (task) => {
    setTaskToEdit({ ...task });
  };

  const handleSubmit = (task) => {
    // console.log("Submit", task);

    if (task.id === 0) {
      const filteredTask = tasksList.filter(
        (t) => t.title.trim().toUpperCase() === task.title.trim().toUpperCase()
      );
      if (filteredTask.length > 0) {
        console.error(
          "Duplicate task entered",
          task.title.trim().toUpperCase()
        );
        return;
      }

      task.id = Date.now() * 2;
      const allTasks = [...tasksList, task];
      setTasks(allTasks);
    } else {
      let allTasks = [...tasksList];
      let index = allTasks.findIndex((t) => t.id === task.id);
      let taskToUpdate = { ...allTasks[index] };
      taskToUpdate.title = task.title;
      allTasks[index] = taskToUpdate;
      setTasks(allTasks);
      setTaskToEdit(emptyIdZero);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ToDoList
            tasksList={tasksList}
            onTaskComplete={handleTaskComplete}
            onTaskUndoComplete={handleTaskUndoComplete}
            onTaskDelete={handleTaskDelete}
            onTaskEdit={handleTaskEdit}
          />
        </div>
        <div className="col">
          <ToDoForm onSubmit={handleSubmit} task={taskToEdit} />
        </div>
      </div>
    </div>
  );
}
