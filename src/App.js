import React from "react";
import ToDoApp from "./components/ToDoApp";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <NavBar />
      <ToDoApp />
      <ToastContainer />
    </>
  );
};

export default App;
