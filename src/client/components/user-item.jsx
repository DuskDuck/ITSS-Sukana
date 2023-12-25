import React from 'react'

import PropTypes from 'prop-types'

import './user-item.css'

import greenimg from '../assets/image/green.PNG'

const UserItem = (props) => {
  return (
    <div className={`user-item-user-item ${props.rootClassName} `}>
      <div className="user-item-user-img-container">
        <img
          src={props.user_img_src}
          alt={props.user_img_alt}
          className="user-item-user-img"
        />
        <img
          src={greenimg}
          alt={props.status_img_alt}
          className="user-item-status-img"
        />
      </div>
      <span className="user-item-user-name">
        <span className="">user-name</span>
        <br className=""></br>
        <br className=""></br>
      </span>
    </div>
  )
}

UserItem.defaultProps = {
  user_img_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  user_img_alt: 'image',
  status_img_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  status_img_alt: 'image',
  rootClassName: '',
}

UserItem.propTypes = {
  user_img_src: PropTypes.string,
  user_img_alt: PropTypes.string,
  status_img_src: PropTypes.string,
  status_img_alt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default UserItem
