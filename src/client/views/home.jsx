import React from 'react'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-container1">
        <span className="home-text">
          <span>My heart skip a beat when i meet you</span>
          <br></br>
          <br></br>
        </span>
      </div>
      <div className="home-topbar">
        <input
          type="text"
          placeholder="Search"
          className="home-searchbar input"
        />
        <button type="button" className="home-filter button">
          Button
        </button>
        <button type="button" className="home-notification button">
          Button
        </button>
      </div>
      <div className="home-main">
        <div className="home-navbar-container">
          <div className="home-navbar">
            <button type="button" className="home-home button">
              Button
            </button>
            <button type="button" className="home-ideal-match button">
              Button
            </button>
            <button type="button" className="home-message button">
              Button
            </button>
            <button type="button" className="home-friendlist button">
              Button
            </button>
            <button type="button" className="home-profile button">
              Button
            </button>
          </div>
        </div>
        <div className="home-main-area">
          <img
            alt="image"
            src="/image_2023-12-12_144825574-1500h.png"
            className="home-image"
          />
          <div className="home-container2">
            <img
              alt="image"
              src="/image_2023-12-12_145509559-1200h.png"
              className="home-image1"
            />
            <button type="button" className="home-button button">
              <span className="home-text4">
                <span>Continue</span>
                <br></br>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
