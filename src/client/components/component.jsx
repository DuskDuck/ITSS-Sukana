import React from 'react'

import PropTypes from 'prop-types'

import './component.css'

const AppComponent = (props) => {
  return (
    <div className="app-component-container">
      <div className="app-component-container1">
        <span className="app-component-text">
          <span>My heart skip a beat when i meet you</span>
          <br></br>
          <br></br>
        </span>
      </div>
      <div className="app-component-topbar">
        <input
          type="text"
          placeholder={props.searchbar_placeholder}
          className="app-component-searchbar input"
        />
        <button type="button" className="app-component-filter button">
          {props.filter}
        </button>
        <button type="button" className="app-component-notification button">
          {props.notification}
        </button>
      </div>
    </div>
  )
}

AppComponent.defaultProps = {
  searchbar_placeholder: 'Search',
  filter: 'Button',
  notification: 'Button',
}

AppComponent.propTypes = {
  searchbar_placeholder: PropTypes.string,
  filter: PropTypes.string,
  notification: PropTypes.string,
}

export default AppComponent
