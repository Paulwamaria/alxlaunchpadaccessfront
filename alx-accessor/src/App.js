import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Mynavbar from "./componets/layout/MyNavbar";

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <Mynavbar />
        </div>
      </Router>
    );
  }
}

export default App;
