import React, { useState, useRef, useEffect } from "react";
import "./filter.css";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const defaultDistantValue = 0;
  const defaultAgeRange = [0, 20];
  const defaultLocation = "location1";

  const [locationValue, setLocationValue] = useState(defaultLocation);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedInterested, setSelectedInterested] = useState([]);
  const [distantValue, setDistantValue] = useState(defaultDistantValue);
  const [ageRange, setAgeRange] = React.useState([0, 20]);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(0);
  };
  const handleGenderClick = (gender) => {
    setSelectedGender([gender]);
  };

  const handleInterestedClick = (interest) => {
    setSelectedInterested((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest]
    );
  };

  const handleDistantChange = (event) => {
    setDistantValue(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  };

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleClear = () => {
    setSelectedGender([]);
    setSelectedInterested([]);
    setDistantValue(defaultDistantValue);
    setAgeRange(defaultAgeRange);
    setLocationValue(defaultLocation);
  };

  return (
    <div className="filter-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div className="filter-title">Filter</div>
      <div className="gender-section">
        <div className="filter-subtitle">Gender</div>
        <div className="filter-gender">
          <button
            style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
            className={`gender-button ${
              selectedGender.includes("boys") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("boys")}
          >
            Boys
          </button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <button
            className={`gender-button ${
              selectedGender.includes("girls") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("girls")}
          >
            Girls
          </button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <button
            style={{ borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
            className={`gender-button ${
              selectedGender.includes("others") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("others")}
          >
            Others
          </button>
        </div>
      </div>
      <div className="location-section">
        <div className="filter-subtitle">Location</div>
        <select
          value={locationValue}
          onChange={handleLocationChange}
          className="filter-dropdown"
        >
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
          <option value="location3">Location 3</option>
        </select>
      </div>
      <div className="filter-section">
        <div className="filter-subtitle">Distant</div>
        <Slider
          style={{ color: "#e03368" }}
          type="range"
          className="filter-slider"
          value={distantValue}
          onChange={handleDistantChange}
        />
        <div className="distant-value">{`${distantValue} Km`}</div>
      </div>
      <div className="filter-section">
        <div className="filter-subtitle">Age</div>
        <Slider
          style={{ color: "#e03368" }}
          getAriaLabel={() => "Age range"}
          value={ageRange}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
        />
        <div className="distant-value">{`${ageRange[0]} - ${ageRange[1]} tuổi`}</div>
      </div>
      <div className="filter-section">
        <div className="filter-subtitle">Interested in</div>
        <div className="filter-options">
          <button
            className={`filter-button ${
              selectedInterested.includes("interest1") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest1")}
          >
            Interest 1
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest2") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest2")}
          >
            Interest 2
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest3") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest3")}
          >
            Interest 3
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest4") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest4")}
          >
            Interest 4
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest5") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest5")}
          >
            Interest 5
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest6") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest6")}
          >
            Interest 6
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest7") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest7")}
          >
            Interest 7
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest8") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest8")}
          >
            Interest 8
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("interest9") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("interest9")}
          >
            Interest 9
          </button>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="clear" onClick={handleClear}>
          Clear
        </button>
        <button className="submit">Apply</button>
      </div>
    </div>
  );
};

export default Filter;