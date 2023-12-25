import React from 'react'

import PropTypes from 'prop-types'

import './other-message.css'

const OtherMessage = (props) => {
  return (
    <div className={`other-message-container ${props.rootClassName} `}>
      <span className="other-message-message-content">{props.text}</span>
      <span className="other-message-date">
        <span className="">8:44 PM</span>
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
