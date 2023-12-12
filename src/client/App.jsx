import { useState } from "react";
import reactLogo from "./assets/react.svg";
import './style.css'
import Home from './views/home'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-dom'

function App() {
  return (
        <Home></Home>
  );
}

export default App;

