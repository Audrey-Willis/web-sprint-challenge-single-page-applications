import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // imported router

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );  //wrapped the app in the router.


