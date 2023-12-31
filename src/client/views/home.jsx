import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import "./home.css";
import page1 from "./page1.PNG";
import page2 from "./page2.PNG";
import Filter from "../views/filter";
//Import Font
import WebFont from "webfontloader";

const Home = (props) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const showFilter = () => {
    setIsFilterVisible(true);
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });
  }, []);
  return (
    <div className="home-container">
      <Helmet>
        <title>Teender - Ideal Match</title>
        <meta property="og:title" content="Teender - Ideal Match" />
      </Helmet>
      {isFilterVisible && (
        <div className="overlay">
          <Filter setIsFilterVisible={setIsFilterVisible} />
        </div>
      )}

      <AppComponent
        onFilterClick={showFilter}
        onLogoutClick={handleLogoutClick}
      ></AppComponent>
      <div className="home-main">
        <NavbarContainer></NavbarContainer>
        <div className="home-main-area">
          <img alt="image" src={page1} className="home-image" />
          <div className="home-container1">
            <img alt="image" src={page2} className="home-image1" />
            <button
              onClick={() => handleClick("/idealmatch-result")}
              type="button"
              className="home-button button"
            >
              <span className="home-text">
                <span>Continue</span>
                <br></br>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
