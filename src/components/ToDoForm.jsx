import React, { useState, useEffect } from "react";
import InputControl from "./common/inputControl";

const ToDoForm = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [oldTitle, setOldTitle] = useState("");

  useEffect(() => {
    // console.log(taskTitle, "useEffect taskID", props.task);
    const { task } = props;
    if (task.title) {
      setTaskTitle(task.title);
      setOldTitle(task.title);
    } else {
      setTaskTitle("");
      setOldTitle("");
    }
  }, [props.task.id]);

  const handleChange = (e) => {
    setTaskTitle(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("submitted");
    if (taskTitle.trim().length === 0) return;

    const { task } = props;
    if (task.id) {
      props.onSubmit({ ...task, title: taskTitle, id: task.id, oldTitle: oldTitle });
    } else {
      props.onSubmit({ title: taskTitle, id: 0, completed: false });
    }

    setOldTitle("");
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
            <InputControl label="Task Detail" name="taskDetail" type="text" value={taskTitle} onChange={handleChange} />
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </div>
      </form>
      <pre hidden>{props.task.id}</pre>
    </>
  );
};

export default ToDoForm;
