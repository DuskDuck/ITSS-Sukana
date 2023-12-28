import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import API_ENDPOINT from "./apiConfig";
import "./profile.css";
import Filter from "../views/filter";
import WebFont from "webfontloader";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const userId = localStorage.getItem("id");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const navigate = useNavigate();
  const showFilter = () => {
    setIsFilterVisible(true);
  };
  const expandImage = (image) => {
    setExpandedImage(image);
  };
  const closeExpandedImage = () => {
    setExpandedImage(null);
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(API_ENDPOINT + `/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);
  const handleSendFriendRequest = async () => {
    const requestData = {
      requester_id: userId,
      receiver_id: userData.id,
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
      setResponseMessage("Friend request sent successfully!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      setResponseMessage("Failed to send friend request.");
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });
  }, []);

  if (!userData) {
    return null;
  }
  const parseHobbies = (hobbiesString) => {
    if (!hobbiesString || typeof hobbiesString !== "string") {
      return [];
    }
    const hobbiesArray = hobbiesString.split(",");
    const trimmedHobbies = hobbiesArray.map((hobby) => hobby.trim());

    return trimmedHobbies;
  };
  const hasImages = userData.image_urls && userData.image_urls.length > 0;
  return (
    <div className="profile-container">
      <Helmet>
        <title>Teender - {userData.first_name}'s Profile</title>
        <meta
          property="og:title"
          content={`Teender - ${userData.first_name}'s Profile`}
        />
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
      <div className="profile-main">
        <NavbarContainer></NavbarContainer>
        <div className="profile-main-area">
          <div className="profile-avatar">
            <img
              src={userData.default_image_url}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="profile-details">
            <div className="profile-info">
              <h1>
                {userData.first_name} {userData.last_name}, {userData.age}
              </h1>
              <h2>Address</h2>
              <p>{userData.address}</p>
            </div>
            <div className="about-container">
              <div className="profile-about">
                <h2>About Me</h2>
                <p>{userData.about}</p>
              </div>
              <div className="add-friend">
                <button
                  className="add-friend-button"
                  onClick={handleSendFriendRequest}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>

            <div className="profile-hobby">
              <h2>Hobbies</h2>
              <div className="hobby-container">
                {parseHobbies(userData.hobbies).map((hobby, index) => (
                  <p className="hobby-item" key={index}>
                    {hobby}
                  </p>
                ))}
              </div>
            </div>

            <div className="profile-gallery">
              <h2>Gallery</h2>
              {hasImages ? (
                <div className="gallery">
                  {userData.image_urls.map((image, index) => (
                    <img
                      className="gallery-images"
                      key={index}
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      onClick={() => expandImage(image)}
                    />
                  ))}
                </div>
              ) : (
                <p>Gallery không có ảnh</p>
              )}
              {expandedImage && (
                <div className="image-overlay" onClick={closeExpandedImage}>
                  <img
                    className="expanded-image"
                    src={expandedImage}
                    alt="Expanded Image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
