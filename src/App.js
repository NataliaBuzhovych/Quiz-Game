import "./App.css";
import React from "react";
import Home from "./components/Home/home";
import Play from "./components/Play/play";
import Result from "./components/Result/result";
import { useQuizContext } from "../src/context/context";

function App() {
  const { play, home, result } = useQuizContext();

  return (
    <div className="wrapper">
      <div className="container">
        {home && <Home />}
        {play && <Play />}
        {result && <Result />}
      </div>
    </div>
  );
}

export default App;
