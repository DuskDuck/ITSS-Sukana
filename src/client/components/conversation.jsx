import React from 'react'

import PropTypes from 'prop-types'

import './conversation.css'

import redimg from '../assets/image/red.PNG'

const Conversation = (props) => {
  return (
    <div className={`conversation-conversation ${props.rootClassName} `}>
      <img
        src={props.user_img_src}
        alt={props.user_img_alt}
        className="conversation-user-img"
      />
      <div className="conversation-mess-info-container">
        <span className="conversation-user-name-text">
          <span className="">user-name</span>
          <br className=""></br>
        </span>
        <span className="conversation-new-message">
          <span className="">new messages</span>
          <br className=""></br>
        </span>
      </div>
      <div className="conversation-end-content-container">
        <span className="conversation-time-elapsed-text">
          {props.time_elapsed_text}
        </span>
        <div className="conversation-notify">
          <img
            src={redimg}
            alt={props.notify_bg_alt}
            className="conversation-notify-bg"
          />
          <span className="conversation-notify-num">
            <span className="">25</span>
            <br className=""></br>
          </span>
        </div>
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
}

Conversation.propTypes = {
  user_img_src: PropTypes.string,
  user_img_alt: PropTypes.string,
  time_elapsed_text: PropTypes.string,
  notify_bg_src: PropTypes.string,
  notify_bg_alt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Conversation
