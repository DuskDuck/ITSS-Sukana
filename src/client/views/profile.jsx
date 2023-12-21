import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import API_ENDPOINT from "./apiConfig";
import "./profile.css";
import Filter from "../views/filter";
import WebFont from "webfontloader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

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
  // const handleSendFriendRequest = async () => {
  //   const requestData = {
  //     requester_id: 1,
  //     receiver_id: userData.id,
  //   };
  //   console.log(requestData);
  //   try {
  //     const response = await fetch(API_ENDPOINT + "/api/friends/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok.");
  //     }

  //     const responseData = await response.json();
  //     // Handle the response data if needed
  //     setResponseMessage("Friend request sent successfully!");
  //   } catch (error) {
  //     console.error("Error sending friend request:", error);
  //     setResponseMessage("Failed to send friend request.");
  //   }
  // };
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
          <Filter />
        </div>
      )}
      <AppComponent onFilterClick={showFilter}></AppComponent>
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
              {/* <p>{userData.occupation}</p> */}
              <h2>Address</h2>
              <p>{userData.address}</p>
            </div>
            <div className="profile-about">
              <h2>About Me</h2>
              <p>{userData.about}</p>
            </div>
            <div className="profile-interests">
              <h2>Hobbies</h2>
              <div className="interests-container">
                {parseHobbies(userData.hobbies).map((hobby, index) => (
                  <p className="interest-item" key={index}>
                    {hobby}
                  </p>
                ))}
              </div>
            </div>
            {/* <div className="add-friend">
              <button
                className="add-friend-button"
                onClick={handleSendFriendRequest}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div> */}

            {/*// <div className="profile-gallery">
            //   <h2>Gallery</h2>
            //   <div className="gallery">
            //     {userData.gallery.map((image, index) => (
            //       <img
            //         className="gallery-images"
            //         key={index}
            //         src={image}
            //         alt={`Gallery Image ${index + 1}`}
            //       />
            //     ))}
            //   </div>
            // </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
