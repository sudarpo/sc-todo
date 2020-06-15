import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ToDoApp from "./components/ToDoApp";
import NavBar from "./components/navBar";
import AllContext from "./components/hooks/AllContext";

const App = () => {
  const [appMode, setAppMode] = useState("");

  const handleChangeMode = (newMode) => {
    setAppMode(newMode);
    console.log(appMode, "--->", newMode);
  };

  return (
    <>
      <AllContext.Provider value={{ mode: appMode, changeMode: handleChangeMode }}>
        <NavBar />
        <ToDoApp />
        <ToastContainer />
      </AllContext.Provider>
    </>
  );
};

export default App;
