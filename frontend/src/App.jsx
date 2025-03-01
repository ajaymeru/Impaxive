import { useState } from "react";
import "./App.css";
import Home from "./Home";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
