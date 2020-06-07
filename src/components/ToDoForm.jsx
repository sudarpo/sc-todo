import React, { useState, useEffect } from "react";
import InputControl from "./common/inputControl";

const ToDoForm = (props) => {
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    // console.log(taskTitle, "useEffect taskID", props.task);
    const { task } = props;
    if (task.title) {
      setTaskTitle(task.title);
    } else {
      setTaskTitle("");
    }
  }, [props]);

  const handleChange = (e) => {
    setTaskTitle(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskTitle.trim().length === 0) return;

    const { task } = props;
    if (task.id) {
      props.onSubmit({ title: taskTitle, id: task.id });
    } else {
      props.onSubmit({ title: taskTitle, id: 0 });
    }

    setTaskTitle("");
  };

  const renderTitle = () => {
    const { task } = props;
    return task && task.id === 0 ? "Add New Task" : "Edit Task";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">{renderTitle()}</div>
          <div className="card-body">
            <InputControl
              label="Task Detail"
              name="taskDetail"
              type="text"
              value={taskTitle}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </div>
      </form>
      <pre>{props.task.id}</pre>
    </>
  );
};

export default ToDoForm;
