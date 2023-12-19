import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//ICON import Section
import locationIcon from '../assets/image/location-pin.png'
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
      <div className="app-component-container2">
          <img
            src={locationIcon}
            alt={props.image_alt}
            className="app-component-image"
          />
          <div className="app-component-container3">
            <span className="app-component-text4">{props.text}</span>
            <span className="app-component-text5">{props.text1}</span>
          </div>
        </div>
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
  text: 'Location',
  text1: 'Hanoi, Vietnam',
};

AppComponent.propTypes = {
  searchbar_placeholder: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
};

export default AppComponent;
