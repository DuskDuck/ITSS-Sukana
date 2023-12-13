import React from 'react'

import PropTypes from 'prop-types'

import './navbar-container.css'

const NavbarContainer = (props) => {
  return (
    <div className="navbar-container-navbar-container">
      <div className="navbar-container-navbar">
        <button type="button" className="navbar-container-home button">
          {props.Home}
        </button>
        <button type="button" className="navbar-container-ideal-match button">
          {props.IdealMatch}
        </button>
        <button type="button" className="navbar-container-message button">
          {props.Message}
        </button>
        <button type="button" className="navbar-container-friendlist button">
          {props.Friendlist}
        </button>
        <button type="button" className="navbar-container-profile button">
          {props.Profile}
        </button>
      </div>
    </div>
  )
}

NavbarContainer.defaultProps = {
  Home: 'Button',
  IdealMatch: 'Button',
  Message: 'Button',
  Friendlist: 'Button',
  Profile: 'Button',
}

NavbarContainer.propTypes = {
  Home: PropTypes.string,
  IdealMatch: PropTypes.string,
  Message: PropTypes.string,
  Friendlist: PropTypes.string,
  Profile: PropTypes.string,
}

export default NavbarContainer
