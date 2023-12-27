import React from 'react'

import PropTypes from 'prop-types'

import './your-message.css'

const YourMessage = ({ message, time }) => {
  return (
    <div className={`your-message-container`}>
      <span className="your-message-message-content">{message}</span>
      <span className="your-message-date">
        <span className="">{time}</span>
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
