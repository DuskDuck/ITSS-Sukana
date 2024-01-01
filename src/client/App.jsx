import React, { useState, useEffect, useRef } from "react";
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
import socket from "./socket";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log(
        "[+] a user connected (" + connectedClients + ")   - UserID:" + socket.id
      );
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log(
        "[X] a user disconnected (" + connectedClients + ")- UserID:" + socket.id
      );
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
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
