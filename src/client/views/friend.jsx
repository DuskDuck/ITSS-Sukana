import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AppComponent from "../components/component";
import NavbarContainer from "../components/navbar-container";
import "./friend.css";
import Filter from "../views/filter";
import WebFont from "webfontloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import API_ENDPOINT from "./apiConfig";

const Friend = () => {
  const userId = localStorage.getItem("id");
  const [friendRequests, setFriendRequests] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });

    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          API_ENDPOINT + `/api/friends/recieved/${userId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const responseData = await response.json();
        setFriendRequests(responseData.friendRequestsWithImages);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

  const handleAccept = async (friendRequestId) => {
    try {
        // First API call to respond to the friend request
        const response = await fetch(API_ENDPOINT + "/api/friends/respond", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requester_id: friendRequests.find(
              (friend) => friend.id === friendRequestId
            ).requester_id,
            receiver_id: userId,
            status: "ACCEPTED",
          }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
    
        // Second API call after successfully accepting the friend request
        const secondResponse = await fetch(API_ENDPOINT + "/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_user: friendRequests.find(
              (friend) => friend.id === friendRequestId
            ).requester_id,
            to_user: userId,
            content: "Hey!",
          }),
        });
    
        if (!secondResponse.ok) {
          throw new Error("Second API request failed.");
        }
    
        // Update state or perform other actions based on the second API response
    
        // Update friendRequests state to remove the accepted friend request
        setFriendRequests((prevFriendRequests) =>
          prevFriendRequests.filter((friend) => friend.id !== friendRequestId)
        );
    
        setNotification("ACCEPTED");
      } catch (error) {
        console.error("Error accepting friend request:", error);
      }
  };

  const handleCancel = async (friendRequestId) => {
    try {
      const response = await fetch(API_ENDPOINT + "/api/friends/respond", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requester_id: friendRequests.find(
            (friend) => friend.id === friendRequestId
          ).requester_id,
          receiver_id: userId,
          status: "CANCELED",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      setFriendRequests((prevFriendRequests) =>
        prevFriendRequests.filter((friend) => friend.id !== friendRequestId)
      );

      setNotification("CANCELED");
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  const showFilter = () => {
    setIsFilterVisible(true);
  };

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
          {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
            friendRequests.map((friend) => (
              <div key={friend.id} className="friend-item">
                <div className="friend-avatar-containter">
                  <img
                    className="friend-avatar"
                    src={friend.requester_image_url}
                    alt={`${friend.requester_first_name} ${friend.requester_last_name}'s Avatar`}
                  />
                  <div className="friend-info">
                    {`${friend.requester_first_name} ${friend.requester_last_name}`}
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
      {notification && (
        <div className="notification">
          {notification === "ACCEPTED"
            ? "Friend request accepted!"
            : "Friend request canceled!"}
        </div>
      )}
    </div>
  );
};

export default Friend;
