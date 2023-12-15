import React from 'react'
import './navbar-container.css'
import { useNavigate } from 'react-router-dom';

//ICON Import Section
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavbarContainer = (props) => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="navbar-container-navbar-container">
      <div className="navbar-container-navbar">
        <button onClick={() => handleClick('/')} type="button" className="navbar-container-home button">
          <FontAwesomeIcon icon={faHouse} />
        </button>
        <button onClick={() => handleClick('/idealmatch')} type="button" className="navbar-container-ideal-match button">
          <FontAwesomeIcon icon={faCompass} />
        </button>
        <button type="button" className="navbar-container-message button">
          <FontAwesomeIcon icon={faMessage} />
        </button>
          <button type="button" className="navbar-container-friendlist button">
          <FontAwesomeIcon icon={faUserGroup} />
        </button>
        <button type="button" className="navbar-container-profile button">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  )
}

export default NavbarContainer
