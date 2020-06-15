import React from "react";
import ToDoApp from "./components/ToDoApp";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToDoApp />
      <ToastContainer />
    </>
  );
};

export default App;
