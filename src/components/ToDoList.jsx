import React from "react";

export default function ToDoList(props) {
  const {
    tasksList,
    onTaskComplete,
    onTaskUndoComplete,
    onTaskDelete,
    onTaskEdit,
  } = props;

  const countPending = tasksList.filter((t) => t.completed === false).length;
  const countCompleted = tasksList.length - countPending;

  const renderAction = (task) => {
    return (
      <span className="float-right">
        {task.completed ? (
          <>
            <span className="badge badge-success m-1">done</span>
            <button
              type="button"
              title="Undo"
              className="btn btn-sm btn-secondary mr-1"
              onClick={() => onTaskUndoComplete(task)}
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </button>
          </>
        ) : (
          <>
            <span className="badge badge-warning m-1"></span>
            <button
              type="button"
              title="Edit"
              className="btn btn-sm btn-secondary mr-1"
              onClick={() => onTaskEdit(task)}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              title="Mark Complete"
              className="btn btn-sm btn-primary"
              onClick={() => onTaskComplete(task)}
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          </>
        )}

        <button
          type="button"
          title="Delete"
          className="btn btn-sm btn-danger m-1"
          onClick={() => onTaskDelete(task)}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          {tasksList.length} tasks ~ {countPending} pending ~ {countCompleted}{" "}
          completed
        </div>
        <div className="card-body">
          <div className="list-group">
            {tasksList.map((task) => {
              return (
                <div className="list-group-item" key={task.id}>
                  <i className="fa fa-dot-circle-o mr-2" aria-hidden="true"></i>
                  {task.completed ? (
                    <>
                      <del>{task.title}</del>
                    </>
                  ) : (
                    <>{task.title}</>
                  )}

                  {renderAction(task)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
