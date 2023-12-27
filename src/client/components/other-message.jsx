import React from 'react'

import PropTypes from 'prop-types'

import './other-message.css'

const OtherMessage = ({ message, time }) => {
  return (
    <div className={`other-message-container`}>
      <span className="other-message-message-content">{message}</span>
      <span className="other-message-date">
        <span className="">{time}</span>
        <br className=""></br>
      </span>
    </div>
  )
}

OtherMessage.defaultProps = {
  text: 'Hey how are you, i want to tell you something. Text me back ok',
  rootClassName: '',
}

OtherMessage.propTypes = {
  text: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default OtherMessage
