import React, { useEffect, useState } from "react";

import { Helmet } from 'react-helmet'

import AppComponent from '../components/component'
import NavbarContainer from '../components/navbar-container'
import './homepage.css'
import Filter from "../views/filter";

//Import Font
import WebFont from "webfontloader";

//ICON Import Section
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

//Static Image Import Section
import bg1 from '../assets/image/sect-gate-view.png'
import bg2 from '../assets/image/somewhere.png'


const Homepage = (props) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const showFilter = () => {
    setIsFilterVisible(true);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });
  }, []);
  return (
    <div className="homepage-container">
      <Helmet>
        <title>Teender - Homepage</title>
        <meta property="og:title" content="Teender - Homepage" />
      </Helmet>
      {isFilterVisible && (
        <div className="overlay">
          <Filter />
        </div>
      )}
      <AppComponent onFilterClick={showFilter}></AppComponent>
      <div className="homepage-main">
        <NavbarContainer></NavbarContainer>
        <div className="homepage-main-area">
          <button type="button" className="homepage-button3 button swipe-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="main-container">
            <div className="image-container">
              <img
                src={bg1}
                alt="image"
                className="homepage-image"
              />
              <img
                src={bg2}
                alt="image"
                className="homepage-image1"
              />
              <img
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                alt="image"
                className="homepage-image2"
              />
            </div>
            <div className="button-container">
              <button type="button" className="homepage-button1 button">
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button type="button" className="homepage-love button">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <button type="button" className="homepage-button2 button">
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          </div>
          <button type="button" className="homepage-button3 button swipe-button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Homepage
