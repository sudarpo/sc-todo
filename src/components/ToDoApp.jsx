import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { getTodoList, createToDo, editToDo, deleteToDo } from "./services/ToDoService";
import AllContext from "./hooks/AllContext";

const emptyIdZero = { id: 0 };

export default function ToDoApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(emptyIdZero);
  const [tasksList, setTasks] = useState([]);
  const [isEntryMode, setIsEntryMode] = useState(false);
  const allContext = useContext(AllContext);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    const appMode = allContext.mode;
    console.log("App mode = ", appMode);
    setIsEntryMode(appMode === "NewTask" || appMode === "EditTask");
  }, [allContext.mode]);

  const getTodos = async () => {
    const { data } = await getTodoList();
    if (data.isSuccess) {
      setTasks(data.result);
    }
    setIsLoading(false);
  };

  const toggleCompleteTask = async (task) => {
    setIsLoading(true);
    const originalTasks = [...tasksList];

    try {
      const allTasks = [...tasksList];
      const index = allTasks.findIndex((t) => t.id === task.id);
      const task1 = { ...allTasks[index], oldTitle: task.title };
      task1.completed = !task.completed;
      allTasks[index] = task1;

      const { data } = await editToDo(task1);
      console.log("Update response", data);
      if (data.isSuccess) {
        toast.success(`Task [${task1.title}] has been updated.`);
        allTasks[index] = { ...task1, completed: data.result.completed, title: data.result.title };
        setTasks(allTasks);
      } else {
        toast.error(`Error occured while updating task [${task.title}]. ${data.error.message}`);
        setTasks(originalTasks);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update to do status. Error: " + error);
    }

    setIsLoading(false);
  };

  const handleTaskComplete = (task) => {
    toggleCompleteTask(task);
  };

  const handleTaskUndoComplete = (task) => {
    toggleCompleteTask(task);
  };

  const handleTaskDelete = async (task) => {
    setIsLoading(true);
    const originalTasks = [...tasksList];

    try {
      let filtered = [...tasksList].filter((t) => t.id !== task.id);
      setTasks(filtered);
      if (task.id === taskToEdit.id) {
        // this.setState({ taskToEdit: { id: 0, deleted: true } });
        setTaskToEdit({ ...emptyIdZero, deleted: true });
      }

      const { data } = await deleteToDo(task);
      console.log("Delete response", data);
      if (data.isSuccess) {
        toast.success(`Task [${task.title}] has been deleted.`);
      } else {
        toast.error(`Error occured while deleting task [${task.title}]. ${data.error.message}`);
        setTasks(originalTasks);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete to do. Error: " + error);
    }

    setIsLoading(false);
  };

  const handleTaskEdit = (task) => {
    setTaskToEdit({ ...task });
    allContext.changeMode("EditTask");
  };

  const handleCancelEdit = (task) => {
    setTaskToEdit(emptyIdZero);
    allContext.changeMode("EditTaskCancelled");
  };

  const createNewTodo = async (task) => {
    try {
      const filteredTask = tasksList.filter((t) => t.title.trim().toUpperCase() === task.title.trim().toUpperCase());
      if (filteredTask.length > 0) {
        console.error("Task already exist", task.title.trim().toUpperCase());
        toast.error(`Task '${task.title}' already exist`);
        setIsLoading(false);
        return;
      }

      // task.id = Date.now() * 2;
      const response = await createToDo(task);
      let { data } = response;
      console.log(data, data.result.id);

      const allTasks = [...tasksList, { ...task, id: data.result.id }];
      setTasks(allTasks);
      setTaskToEdit(emptyIdZero);
    } catch (error) {
      console.error(error);
      toast.error("Unable to create to do. Error: " + error);
    }

    allContext.changeMode("NewTaskDone");
    setIsLoading(false);
  };

  const updateToDo = async (task) => {
    const originalTasks = [...tasksList];
    try {
      let allTasks = [...tasksList];
      let index = allTasks.findIndex((t) => t.id === task.id);
      let taskToUpdate = { ...allTasks[index] };
      taskToUpdate.title = task.title;

      const { data } = await editToDo(task);
      console.log("Update response", data);
      if (data.isSuccess) {
        toast.success(`Task [${task.title}] has been updated.`);
        allTasks[index] = { ...taskToUpdate, title: data.result.title };
        setTasks(allTasks);
        setTaskToEdit(emptyIdZero);
      } else {
        toast.error(`Error occured while updating task [${task.title}]. ${data.error.message}`);
        setTasks(originalTasks);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update to do. Error: " + error);
      setTasks(originalTasks);
    }

    allContext.changeMode("EditTaskDone");
    setIsLoading(false);
  };

  const handleSubmit = async (task) => {
    // console.log("Submit", task);
    setIsLoading(true);
    if (task.id === 0) {
      createNewTodo(task);
    } else {
      updateToDo(task);
    }
  };

  return (
    <>
      <div className="container-fluid">
        {isLoading && (
          <>
            <div className="fixed-top">
              <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}
        <div className="row">
          {isEntryMode && (
            <div className="col-md">
              <ToDoForm onSubmit={handleSubmit} task={taskToEdit} onCancel={handleCancelEdit} />
            </div>
          )}
          <div className="col-md">
            <ToDoList
              tasksList={tasksList}
              onTaskComplete={handleTaskComplete}
              onTaskUndoComplete={handleTaskUndoComplete}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
