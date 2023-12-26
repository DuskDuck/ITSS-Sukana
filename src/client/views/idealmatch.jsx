import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from 'react-helmet'

import AppComponent from '../components/component'
import NavbarContainer from '../components/navbar-container'
import './idealmatch.css'
import sukana from '../assets/image/download.png'


//API Endpoint Import
import API_ENDPOINT from './apiConfig';

//import font
import WebFont from "webfontloader";

//Icon Import Section
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Idealmatch = (props) => {
  const [matchData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleReloadClick = () => {
    // Reloads the page when the button is clicked
    window.location.reload();
  };

  const handleAvatarClick = () => {
    navigate(`/users/${matchData.id}`);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans", "Indie Flower"],
      },
    });
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch( API_ENDPOINT + '/api/match/1');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
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
              onClick={handleAvatarClick}
              alt="image"
              src={matchData.default_image_url}
              className="idealmatch-image"
            />
            <img
              alt="image"
              src={sukana}
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
            <button onClick={handleReloadClick} type="button" className="idealmatch-button3 button">
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
