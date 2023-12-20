import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";

import "./profile.css";
import Filter from "../views/filter";
import WebFont from "webfontloader";

const Profile = (props) => {
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
  const userProfile = {
    avatar: "src/client/assets/image/avatar.jpeg",
    name: "Hieu",
    age: 25,
    occupation: "Software Developer",
    location: "Ha Noi, Viet Nam",
    about: "I love coding and exploring new technologies.",
    gallery: [
      "src/client/assets/image/gallery1.jpeg",
      "src/client/assets/image/gallery2.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
      "src/client/assets/image/gallery3.jpeg",
    ],
    interests: ["Reading", "Coding", "Traveling"],
  };

  return (
    <div className="profile-container">
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
      <div className="profile-main">
        <NavbarContainer></NavbarContainer>
        <div className="profile-main-area">
          <div className="profile-avatar">
            <img
              src={userProfile.avatar}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="profile-details">
            <div className="profile-info">
              <h1>
                {userProfile.name}, {userProfile.age}
              </h1>
              <p>{userProfile.occupation}</p>
              <h1>Location</h1>
              <p>{userProfile.location}</p>
            </div>
            <div className="profile-about">
              <h2>About Me</h2>
              <p>{userProfile.about}</p>
            </div>
            <div className="profile-interests">
              <h2>Interests</h2>
              <div className="interests-container">
                {userProfile.interests.map((interest, index) => (
                  <div key={index} className="interest-item">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-gallery">
              <h2>Gallery</h2>
              <div className="gallery">
                {userProfile.gallery.map((image, index) => (
                  <img
                    className="gallery-images"
                    key={index}
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
