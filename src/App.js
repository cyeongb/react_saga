import React from "react";
import SampleContainer from "./containers/SampleContainer";
import CounterContainer from "./containers/CounterContainer";
import "./App.css";

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <SampleContainer />
    </div>
  );
}

export default App;
