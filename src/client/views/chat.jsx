import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import NavbarContainer from "../components/navbar-container";
import UserItem from "../components/user-item";
import Conversation from "../components/conversation";
import OtherMessage from "../components/other-message";
import YourMessage from "../components/your-message";
import "./chat.css";
import io from 'socket.io-client';
import API_ENDPOINT from "./apiConfig";

//import Images
import greenimg from "../assets/image/green.PNG";
//Import Font
import WebFont from "webfontloader";

const socket = io('http://localhost:3010');
const userId = localStorage.getItem("id");

const Chat = (props) => {
  console.log(userId);
  const [FriendList, setFriendListData] = useState([]);

  //Socket Section
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('messageRespone', (msg, time, id) => setMessages([...messages, { message: msg, time, id}]));
  }, [messages]);

  const sendMessage = () => {
    socket.emit('your chat message', message, new Date().toLocaleTimeString());
    setMessage('');
  };
  //
  //
  //
  //
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
                  <img src={greenimg} alt="image" className="chat-status-img" />
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
                  placeholder="Enter message"
                  className="chat-chatbar input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <img
                  src="https://play.teleporthq.io/static/svg/default-img.svg"
                  alt="image"
                  className="chat-send-img"
                  onClick={sendMessage}
                />
                <img
                  src="https://play.teleporthq.io/static/svg/default-img.svg"
                  alt="image"
                  className="chat-emoji-img"
                />
              </div>
              {messages.map((messageObj, index) => {
                if (messageObj.id === socket.id) {
                  return (
                    <YourMessage
                      key={index}
                      message={messageObj.message}
                      time={messageObj.time}
                    />
                  );
                } else {
                  return (
                    <OtherMessage
                      key={index}
                      message={messageObj.message}
                      time={messageObj.time}
                    />
                  );
                }
              })}
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
  );
};

export default Chat;
