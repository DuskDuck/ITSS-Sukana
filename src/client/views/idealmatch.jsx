import React, { useEffect, useState } from "react";

import { Helmet } from 'react-helmet'

import AppComponent from '../components/component'
import NavbarContainer from '../components/navbar-container'
import './idealmatch.css'

//import font
import WebFont from "webfontloader";

//Icon Import Section
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Idealmatch = (props) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans", "Indie Flower"],
      },
    });
  }, []);
  return (
    <div className="idealmatch-container">
      <Helmet>
        <title>Teender - Ideal Match</title>
        <meta property="og:title" content="Teender - Ideal Match" />
      </Helmet>
      <AppComponent></AppComponent>
      <div className="idealmatch-main">
        <NavbarContainer></NavbarContainer>
        <div className="idealmatch-main-area">
          <div className="idealmatch-container1">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="idealmatch-image"
            />
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="idealmatch-image1"
            />
            <button type="button" className="idealmatch-button button">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button type="button" className="idealmatch-button1 button">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <div className="idealmatch-container2">
            <span className="idealmatch-text">
              <span>Congratulation</span>
              <br></br>
            </span>
            <span className="idealmatch-text03">
              <span>It&apos;s a match, great!!</span>
              <br></br>
            </span>
            <span className="idealmatch-text06">
              <span>start conversation now with each other</span>
              <br></br>
            </span>
            <button type="button" className="idealmatch-button2 button">
              <span className="idealmatch-text09">
                <span>Say Hello</span>
                <br></br>
              </span>
            </button>
            <button type="button" className="idealmatch-button3 button">
              <span className="idealmatch-text12">
                <span>Keep Swiping</span>
                <br></br>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Idealmatch
