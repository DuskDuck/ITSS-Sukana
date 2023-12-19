import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Profile from "./views/profile";
import Homepage from "./views/homepage";
import Idealmatch from "./views/idealmatch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/idealmatch" element={<Home />} />
        <Route path="/idealmatch-result" element={<Idealmatch />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

// const container = document.getElementById("app");
// const root = createRoot(container);
// root.render(<App />);
export default App;
