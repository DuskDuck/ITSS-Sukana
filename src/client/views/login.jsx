import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_ENDPOINT from "./apiConfig";
import signin from "../assets/image/signin.png";
import "./login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(API_ENDPOINT + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();
      localStorage.setItem("id", responseData.id);
      setIsLoggedIn(true);
      console.log(responseData.id);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${signin})` }}
    >
      <h2 className="title">Sign In</h2>
      <div>
        <p className="email">Email</p>
        <input
          className="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p className="password">Password</p>
        <input
          className="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <div className="sign-up">
        Don't have account yet?<p className="link">Sign up</p>
      </div>
    </div>
  );
};

export default Login;
