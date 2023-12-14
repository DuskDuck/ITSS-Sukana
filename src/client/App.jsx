import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Filter from "./views/filter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// const container = document.getElementById("app");
// const root = createRoot(container);
// root.render(<App />);
export default App;
