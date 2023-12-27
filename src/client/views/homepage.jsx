import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import "./homepage.css";
import Filter from "../views/filter";

//API Endpoint Import
import API_ENDPOINT from "./apiConfig";

//Import Font
import WebFont from "webfontloader";

//ICON Import Section
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

//Static Image Import Section
import bg1 from "../assets/image/sect-gate-view.png";
import bg2 from "../assets/image/somewhere.png";

const Homepage = (props) => {
  const userId = localStorage.getItem("id");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchData, setUserData] = useState([]);
  const filteredData = useSelector((state) => state.filteredData);
  const navigate = useNavigate();
  const showFilter = () => {
    setIsFilterVisible(true);
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleListButtonClickAsc = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < matchData.length ? prevIndex + 1 : 0
    );
  };
  const handleAvatarClick = () => {
    navigate(`/users/${matchData[currentIndex].id}`);
  };
  const handleListButtonClickDes = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < matchData.length ? 0 : prevIndex - 1
    );
  };

  const handleSendFriendRequest = async () => {
    const requestData = {
      requester_id: 1,
      receiver_id: matchData[currentIndex].id,
    };
    console.log(requestData);
    try {
      const response = await fetch(API_ENDPOINT + "/api/friends/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      // Handle the response data if needed
      setResponseMessage("Friend request sent successfully!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      setResponseMessage("Failed to send friend request.");
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3010");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          API_ENDPOINT + `/api/filter?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setUserData(data);
        console.log(userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (filteredData.length === 0 && userId) {
      fetchUserData();
    } else {
      setUserData(filteredData);
    }
  }, [filteredData, userId]);

  console.log(filteredData);
  return (
    <div className="homepage-container">
      <Helmet>
        <title>Teender - Homepage</title>
        <meta property="og:title" content="Teender - Homepage" />
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
      <div className="homepage-main">
        <NavbarContainer></NavbarContainer>
        <div className="homepage-main-area">
          <button
            onClick={handleListButtonClickDes}
            type="button"
            className="homepage-button3 button swipe-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="main-container">
            <div className="image-container">
              <img src={bg1} alt="image" className="homepage-image" />
              <img src={bg2} alt="image" className="homepage-image1" />
              {matchData.length > 0 && (
                <img
                  src={matchData[currentIndex].default_image_url}
                  alt="image"
                  className="homepage-image2"
                  onClick={handleAvatarClick}
                />
              )}
            </div>
            <div className="button-container">
              <button type="button" className="homepage-button1 button">
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button type="button" className="homepage-love button">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <button
                onClick={handleSendFriendRequest}
                type="button"
                className="homepage-button2 button"
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          </div>
          <button
            onClick={handleListButtonClickAsc}
            type="button"
            className="homepage-button3 button swipe-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
