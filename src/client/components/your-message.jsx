import React from 'react'

import PropTypes from 'prop-types'

import './your-message.css'

const YourMessage = (props) => {
  return (
    <div className={`your-message-container ${props.rootClassName} `}>
      <span className="your-message-message-content">{props.text}</span>
      <span className="your-message-date">
        <span className="">8:44 PM</span>
        <br className=""></br>
      </span>
    </div>
  )
}

YourMessage.defaultProps = {
  rootClassName: '',
  text: 'Hey how are you, i want to tell you something. Text me back ok',
}

YourMessage.propTypes = {
  rootClassName: PropTypes.string,
  text: PropTypes.string,
}

export default YourMessage
