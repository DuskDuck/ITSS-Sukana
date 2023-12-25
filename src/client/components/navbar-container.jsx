import React from "react";
import "./navbar-container.css";
import { useNavigate, useLocation } from "react-router-dom";

//ICON Import Section
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCompass,
  faMessage,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import locationIcon from "../assets/image/location-pin.png";

const NavbarContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="navbar-container-navbar-container">
      <div className="navbar-container-navbar">
        <button
          onClick={() => handleClick("/")}
          type="button"
          className={`navbar-container-home button ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
        <button
          onClick={() => handleClick("/idealmatch")}
          type="button"
          className={`navbar-container-ideal-match button ${
            location.pathname === "/idealmatch" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faCompass} />
        </button>
        <button
          type="button"
          className={`navbar-container-message button ${
            location.pathname === "/message" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faMessage} />
        </button>
        <button
          onClick={() => handleClick("/friend")}
          type="button"
          className={`navbar-container-friendlist button ${
            location.pathname === "/friend" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faUserGroup} />
        </button>
        <button
          type="button"
          className={`navbar-container-profile button ${
            location.pathname.startsWith("/users/") ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default NavbarContainer;
