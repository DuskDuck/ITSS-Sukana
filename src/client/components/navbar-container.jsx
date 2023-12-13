import React from 'react'

import PropTypes from 'prop-types'

import './navbar-container.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//ICON Import Section
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavbarContainer = (props) => {
  return (
    <div className="navbar-container-navbar-container">
      <div className="navbar-container-navbar">
        <button type="button" className="navbar-container-home button">
          <FontAwesomeIcon icon={faHouse} />
        </button>
        <button type="button" className="navbar-container-ideal-match button">
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
