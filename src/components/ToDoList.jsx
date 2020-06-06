import React from "react";

export default function ToDoList(props) {
  return (
    <div className="mt-2 list-group">
      {props.Tasks.map((task) => {
        return (
          <div className="list-group-item" key={task.id}>
            {task.title}
            {task.completed ? (
              <span className="badge badge-success float-right">[done]</span>
            ) : (
              <span className="badge badge-warning float-right">[pending]</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
