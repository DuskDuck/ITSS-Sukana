import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import "./friend.css";
import Filter from "../views/filter";
import WebFont from "webfontloader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Friend = ({ request, onAccept, onCancel }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const showFilter = () => {
    setIsFilterVisible(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });
  }, []);

  const handleAccept = (friendRequestId) => {
    console.log(`Accepted friend request with ID ${friendRequestId}`);
  };

  const handleCancel = (friendRequestId) => {
    console.log(`Canceled friend request with ID ${friendRequestId}`);
  };

  const friendRequest = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
      avatarUrl: "src/client/assets/image/gallery1.jpeg",
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 28,
      avatarUrl: "src/client/assets/image/gallery2.jpeg",
    },
    {
      id: 3,
      name: "Jane Doe",
      age: 28,
      avatarUrl: "src/client/assets/image/gallery3.jpeg",
    },
    {
      id: 4,
      name: "Jane Doe",
      age: 28,
      avatarUrl: "src/client/assets/image/gallery1.jpeg",
    },
    {
      id: 5,
      name: "Jane Doe",
      age: 28,
      avatarUrl: "src/client/assets/image/gallery2.jpeg",
    },
    {
      id: 6,
      name: "Jane Doe",
      age: 28,
      avatarUrl: "src/client/assets/image/gallery3.jpeg",
    },
  ];

  return (
    <div className="friend-container">
      <Helmet>
        <title>Teender - Ideal Match</title>
        <meta property="og:title" content="Teender - Ideal Match" />
      </Helmet>
      {isFilterVisible && (
        <div className="overlay">
          <Filter setIsFilterVisible={setIsFilterVisible} />
        </div>
      )}

      <AppComponent onFilterClick={showFilter}></AppComponent>
      <div className="friend-main">
        <NavbarContainer></NavbarContainer>
        <div className="friend-main-area">
          {Array.isArray(friendRequest) && friendRequest.length > 0 ? (
            friendRequest.map((friend) => (
              <div key={friend.id} className="friend-item">
                <div className="friend-avatar-containter">
                  <img
                    className="friend-avatar"
                    src={friend.avatarUrl}
                    alt="Friend Avatar"
                  />
                  <div className="friend-info">
                    {friend.name}, {friend.age}
                  </div>
                  <div className="friend-buttons">
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(friend.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />{" "}
                    </button>
                    <div className="divider"></div>
                    <button
                      className="cancel-button"
                      onClick={() => handleCancel(friend.id)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No friend requests available.</p>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Friend;
