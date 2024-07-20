import React from "react";
import Todo from "./components/Todo/Todo";
import Welcome from "./components/Welcome/Welcome";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Welcome />
      <Todo />
    </div>
  );
}

export default App;
