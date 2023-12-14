import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//ICON import Section
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
//Import Font
import "../assets/font/Roboto/Roboto-Medium.ttf";
import WebFont from "webfontloader";

const AppComponent = (props) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
  }, []);
  return (
    <div className="app-component-container">
      <div className="app-component-container1">
        <span className="app-component-text">
          <span>My heart skip a beat when i meet you</span>
          <br></br>
          <br></br>
        </span>
      </div>
      <div className="app-component-topbar">
        <input
          type="text"
          placeholder={props.searchbar_placeholder}
          className="app-component-searchbar input"
        />
        <button
          type="button"
          className="app-component-filter button"
          onClick={props.onFilterClick}
        >
          <FontAwesomeIcon icon={faSliders} />
        </button>
        <button type="button" className="app-component-notification button">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
    </div>
  );
};

AppComponent.defaultProps = {
  searchbar_placeholder: "Search",
};

AppComponent.propTypes = {
  searchbar_placeholder: PropTypes.string,
};

export default AppComponent;
