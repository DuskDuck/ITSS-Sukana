import React, { useEffect, useState } from "react";

import PropTypes from 'prop-types'

import './conversation.css'

import redimg from '../assets/image/red.PNG'
import API_ENDPOINT from "../views/apiConfig";

const calculateTimeElapsed = (timestamp) => {
  const currentTime = new Date(); // Current time

  // Convert the provided timestamp to a Date object
  const providedTime = new Date(timestamp);

  // Calculate the difference in milliseconds between the two times
  const differenceInMillis = currentTime - providedTime;

  // Calculate the elapsed time in seconds, minutes, hours, and days
  const seconds = Math.floor(differenceInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};


const Conversation = (props) => {
  const [Friend, setFriendData] = useState([]);
  const timestamp = props.time_elapsed_text; 
  const elapsed = calculateTimeElapsed(timestamp);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/api/users/" + props.id);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setFriendData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`conversation-conversation`}>
      <img
        src={Friend.default_image_url}
        alt={props.user_img_alt}
        className="conversation-user-img"
      />
      <div onClick={() => props.handleClick(Friend.id)} className="conversation-mess-info-container">
        <span className="conversation-user-name-text">
          <span className="">{Friend.first_name +' '+ Friend.last_name}</span>
          <br className=""></br>
        </span>
        <span className="conversation-new-message">
          <span className="">{props.user_new_mess}</span>
          <br className=""></br>
        </span>
      </div>
      <div className="conversation-end-content-container">
        <span className="conversation-time-elapsed-text">
          {elapsed.hours + ':' + elapsed.minutes + ' ago'}
        </span>
        {props.status !== "SEEN" && (
          <div className="conversation-notify">
            <img
              src={redimg}
              alt={props.notify_bg_alt}
              className="conversation-notify-bg"
            />
            <span className="conversation-notify-num">
              <span className="">!</span>
              <br className=""></br>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

Conversation.defaultProps = {
  user_img_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  user_img_alt: 'image',
  time_elapsed_text: 'Text',
  notify_bg_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  notify_bg_alt: 'image',
  rootClassName: '',
  user_name: 'user-name',
  user_new_mess: 'new-mess',
}

Conversation.propTypes = {
  user_img_src: PropTypes.string,
  user_img_alt: PropTypes.string,
  user_name: PropTypes.string,
  user_new_mess: PropTypes.string,
  time_elapsed_text: PropTypes.string,
  notify_bg_src: PropTypes.string,
  notify_bg_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.string,
  handleClick: PropTypes.func,
}

export default Conversation
