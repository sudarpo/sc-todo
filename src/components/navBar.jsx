import React, { useContext, useState } from "react";
import AllContext from "./hooks/AllContext";

export default function NavBar() {
  const allContext = useContext(AllContext);
  const [isCollapsed, setCollapsed] = useState(true);

  const handleChangeMode = (newMode) => {
    allContext.changeMode(newMode);
    setCollapsed(true);
  };

  const toggleCollapse = (e) => {
    e.preventDefault();
    console.log("isCollapsed ?", isCollapsed);
    setCollapsed((prevFlag) => !prevFlag);
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
        onClick={toggleCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={isCollapsed ? "collapse navbar-collapse" : "collapse navbar-collapse show"} id="navbarNav">
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
        </ul>
      </div>
    </nav>
  );
}
