import React, { useEffect, useState } from "react";

import { Helmet } from 'react-helmet'

import NavbarContainer from '../components/navbar-container'
import UserItem from '../components/user-item'
import Conversation from '../components/conversation'
import OtherMessage from '../components/other-message'
import YourMessage from '../components/your-message'
import './chat.css'

import greenimg from '../assets/image/green.PNG'

//Import Font
import WebFont from "webfontloader";

const Chat = (props) => {
  const [FriendList, setFriendListData] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Inria Sans"],
      },
    });
  }, []);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/api/friends/recieved/6");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setFriendListData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="chat-container">
      <Helmet>
        <title>chat - Prime Third Mule</title>
        <meta property="og:title" content="chat - Prime Third Mule" />
      </Helmet>
      <div className="chat-main">
        <NavbarContainer></NavbarContainer>
        <div className="chat-main-area">
          <div className="chat-user-list">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="chat-image"
            />
            <input
              type="text"
              placeholder="Search"
              className="chat-textinput input"
            />
            <span className="chat-text">
              <span>Activites</span>
              <br></br>
            </span>
            <div className="chat-friendlist">
              <UserItem rootClassName="user-item-root-class-name"></UserItem>
            </div>
            <span className="chat-text03">
              <span>Messages</span>
              <br></br>
            </span>
            <div className="chat-conversation-container">
              <Conversation></Conversation>
            </div>
          </div>
          <div className="chat-chat-container">
            <div className="chat-user-info">
              <img
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                alt="image"
                className="chat-user-img"
              />
              <div className="chat-mess-info-container">
                <span className="chat-user-name-text">
                  <span>user-name</span>
                  <br></br>
                </span>
                <div className="chat-status-container">
                  <img
                    src={greenimg}
                    alt="image"
                    className="chat-status-img"
                  />
                  <span className="chat-user-status">
                    <span>status</span>
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-chatarea-container">
              <div className="chat-chatbar-container">
                <input
                  type="text"
                  placeholder="placeholder"
                  className="chat-chatbar input"
                />
                <img
                  src="https://play.teleporthq.io/static/svg/default-img.svg"
                  alt="image"
                  className="chat-send-img"
                />
                <img
                  src="https://play.teleporthq.io/static/svg/default-img.svg"
                  alt="image"
                  className="chat-emoji-img"
                />
              </div>
              <OtherMessage rootClassName="other-message-root-class-name"></OtherMessage>
              <YourMessage rootClassName="your-message-root-class-name"></YourMessage>
            </div>
          </div>
        </div>
        <div className="chat-container1">
          <span className="chat-text10">
            <span>My heart skip a beat when i meet you</span>
            <br></br>
            <br></br>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Chat
