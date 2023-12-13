import React from 'react'

import { Helmet } from 'react-helmet'

import AppComponent from '../components/component'
import NavbarContainer from '../components/navbar-container'
import './home.css'
import page1 from './page1.PNG'
import page2 from './page2.PNG'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Dating App</title>
        <meta property="og:title" content="Dating App" />
      </Helmet>
      <AppComponent></AppComponent>
      <div className="home-main">
        <NavbarContainer></NavbarContainer>
        <div className="home-main-area">
          <img
            alt="image"
            src= { page1 }
            className="home-image"
          />
          <div className="home-container1">
            <img
              alt="image"
              src= { page2 }
              className="home-image1"
            />
            <button type="button" className="home-button button">
              <span className="home-text">
                <span>Continue</span>
                <br></br>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
