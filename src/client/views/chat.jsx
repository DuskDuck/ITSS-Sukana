import React, { useEffect, useState, useRef } from "react";

import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import NavbarContainer from "../components/navbar-container";
import UserItem from "../components/user-item";
import Conversation from "../components/conversation";
import OtherMessage from "../components/other-message";
import YourMessage from "../components/your-message";
import "./chat.css";
import io from 'socket.io-client';
import API_ENDPOINT from "./apiConfig";

//ICON Import Section
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Images
import greenimg from "../assets/image/green.PNG";
import noti from "../assets/image/noti.PNG";
import emoji from "../assets/image/happy.png";
import sendicon from "../assets/image/send-message.png";
//Import Font
import WebFont from "webfontloader";

// const socket = io('https://dating-app-lehe.onrender.com:3010');
// console.log('socket connection:' + socket.connected);

const Chat = (props) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [FriendList, setFriendListData] = useState([]);
  const [ToID, setToID] = useState([]);
  const [ConvoList, setConvoListData] = useState([]);
  const [Chat, setChatData] = useState([]);
  const containerRef = useRef(null);

  //Socket Section
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   socket.on('messageRespone', (content, created_at, from_user_id) => {
  //     setMessages([{ content, created_at, from_user_id }, ...messages]);
  //   });
  // }, [messages]);

  // const sendMessage = () => {
  //   if(message.length <= 0){

  //   }else {
  //     socket.emit('your chat message', message, new Date().toLocaleTimeString(), userId);
  //     setMessage('');
  //     SendMessageToDB( message );
  //   }
  // };

  const SendMessageToDB = async (content) => {
    try {
        const Response = await fetch(API_ENDPOINT + "/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_user: userId,
            to_user: ToID,
            content: content,
          }),
        });
    
        if (!Response.ok) {
          throw new Error("API request failed.");
        }
      } catch (error) {
        console.error("Error accepting friend request:", error);
      }
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

  const handleAvatarClick = () => {
    navigate(`/users/` + ToID);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log(ConvoList)
  };

  //FETCH friend list
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/api/friends/user/" + userId);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setFriendListData(data.friendListWithImages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  //FETCH Conversation list
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/api/chat/conversations/" + userId);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setConvoListData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  //FETCH chatbox content
  const getChatbox = async ( user2_id ) => {
    try {
      const response = await fetch(API_ENDPOINT + '/api/chat/messages?user1_id=' + userId + '&user2_id=' + user2_id );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      setToID(user2_id);
      console.log(FriendList.find(friend => friend.friend_id == user2_id).friend_image_url);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="chat-container">
      <Helmet>
        <title>Teender - Chat</title>
        <meta property="og:title" content="Teender - Chat" />
      </Helmet>
      <div className="chat-main">
        <NavbarContainer></NavbarContainer>
        <div className="chat-main-area">
          <div className="chat-user-list">
            <img
              src={noti}
              alt="image"
              className="chat-image"
            />
            <input
              type="text"
              placeholder="Search"
              className="chat-textinput input"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <span className="chat-text">
              <span>Activites</span>
              <br></br>
            </span>
            <div className="chat-friendlist">
              {FriendList.map((FriendListOBJ, index) => {
                  return (
                    <UserItem
                      key={index}
                      name={FriendListOBJ.friend_first_name+FriendListOBJ.friend_last_name}
                      img={FriendListOBJ.friend_image_url}
                      id={FriendListOBJ.friend_id}
                    ></UserItem>
                  );
                })}
            </div>
            <span className="chat-text03">
              <span>Messages</span>
              <br></br>
            </span>
            <div className="chat-conversation-container">
              {ConvoList.map((ConvoListOBJ, index) => {
                  return (
                    <Conversation 
                      key={index}
                      id2={ConvoListOBJ.user2_id}
                      id1={ConvoListOBJ.user1_id}
                      current_u_id={userId}
                      user_img_src={ConvoListOBJ.friend_image_url}
                      time_elapsed_text={ConvoListOBJ.last_message_created_at}
                      status={ConvoListOBJ.status}
                      user_new_mess={ConvoListOBJ.content}
                      handleClick={getChatbox}
                    ></Conversation>
                  );
              })}
            </div>
          </div>
          {ToID && FriendList.find(friend => friend.friend_id == ToID) && (
          <div className="chat-chat-container">
            <div className="chat-user-info">
              <img
                src={FriendList.find(friend => friend.friend_id == ToID).friend_image_url}
                alt="image"
                className="chat-user-img"
                onClick={handleAvatarClick}
              />
              <div className="chat-mess-info-container">
                <span className="chat-user-name-text">
                  <span>{FriendList.find(friend => friend.friend_id == ToID).friend_first_name + ' ' +
                        FriendList.find(friend => friend.friend_id == ToID).friend_last_name}
                  </span>
                  <br></br>
                </span>
                <div className="chat-status-container">
                  <img src={greenimg} alt="image" className="chat-status-img" />
                  <span className="chat-user-status">
                    <span>online</span>
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
                  src={sendicon}
                  alt="image"
                  className="chat-send-img"
                  onClick={sendMessage}
                />
                <img
                  src={emoji}
                  alt="image"
                  className="chat-emoji-img"
                />
              </div>
              {messages.slice().reverse().map((messageObj, index) => {
                if (messageObj.from_user_id == userId) {
                  return (
                    <YourMessage
                      key={index}
                      message={messageObj.content}
                      time={messageObj.created_at}
                    />
                  );
                } else {
                  return (
                    <OtherMessage
                      key={index}
                      message={messageObj.content}
                      time={messageObj.created_at}
                    />
                  );
                }
              })}
            </div>
          </div>
           )}
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