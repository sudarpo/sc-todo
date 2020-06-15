import React, { useContext } from "react";
import AllContext from "./hooks/AllContext";

export default function NavBar() {
  const allContext = useContext(AllContext);

  const handleChangeMode = (newMode) => {
    allContext.changeMode(newMode);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand" href="/#">
        FYM | Forgot Your Milk
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/#" onClick={() => handleChangeMode("AllTasks")}>
              All Tasks <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#" onClick={() => handleChangeMode("NewTask")}>
              New Task
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#" onClick={() => handleChangeMode("Login")}>
              Login
            </a>
          </li>
          <div className="nav-item">{allContext.mode}</div>
        </ul>
      </div>
    </nav>
  );
}
