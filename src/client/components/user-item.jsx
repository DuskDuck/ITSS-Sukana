import React from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

import './user-item.css'

import greenimg from '../assets/image/green.PNG'

const UserItem = ({name,img, id}) => {
  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate(`/users/` + id);
  };

  return (
    <div className={`user-item-user-item`}>
      <div className="user-item-user-img-container">
        <img
          src={img}
          alt='user-img'
          className="user-item-user-img"
          onClick={handleAvatarClick}
        />
        <img
          src={greenimg}
          alt='status-img'
          className="user-item-status-img"
        />
      </div>
      <span className="user-item-user-name">
        <span className="">{name}</span>
        <br className=""></br>
        <br className=""></br>
      </span>
    </div>
  )
}

export default UserItem
