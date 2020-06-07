import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { getTodoList, createToDo, editToDo } from "./services/ToDoService";

const emptyIdZero = { id: 0 };

export default function ToDoApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(emptyIdZero);
  const [tasksList, setTasks] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await getTodoList();
    setTasks(response.data);
    setIsLoading(false);
  };

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

  const handleSubmit = async (task) => {
    // console.log("Submit", task);
    setIsLoading(true);
    if (task.id === 0) {
      // Add new ToDo
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

      // task.id = Date.now() * 2;
      const response = await createToDo(task);
      let newTask = response.data;
      const allTasks = [...tasksList, newTask];
      setTasks(allTasks);
      setIsLoading(false);
    } else {
      // Update ToDo

      let allTasks = [...tasksList];
      let index = allTasks.findIndex((t) => t.id === task.id);
      let taskToUpdate = { ...allTasks[index] };
      taskToUpdate.title = task.title;

      const response = await editToDo(task);
      let data = response.data;

      allTasks[index] = taskToUpdate;
      setTasks(allTasks);
      setTaskToEdit(emptyIdZero);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading && (
        <>
          <div className="fixed-top">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
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
