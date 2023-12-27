import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Profile from "./views/profile";
import Homepage from "./views/homepage";
import Idealmatch from "./views/idealmatch";
import Friend from "./views/friend";
import Chat from "./views/chat";
import Login from "./views/login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/idealmatch" element={<Home />} />
        <Route path="/idealmatch-result" element={<Idealmatch />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Homepage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
