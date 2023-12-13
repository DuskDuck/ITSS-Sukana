import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Home></Home>
    // <Router>
    //   <Routes>
    //     <Route component={Home} exact path="/" />
    //     <Route component={NotFound} path="**" />
    //     <Navigate to="**" />
    //   </Routes>
    // </Router>
  )
}
// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />)
export default App;

