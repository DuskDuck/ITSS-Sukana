import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Filter from "./views/filter";
import Homepage from "./views/homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/idealmatch" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

// const container = document.getElementById("app");
// const root = createRoot(container);
// root.render(<App />);
export default App;
