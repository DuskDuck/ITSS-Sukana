import React, { useState, useEffect } from "react";
import axios from "axios";
import "./filter.css";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilteredData } from "../../redux/action";

import API_ENDPOINT from "./apiConfig";

const Filter = () => {
  const defaultDistantValue = 0;
  const defaultAgeRange = [0, 20];
  const defaultLocation = "Hanoi";

  const [locationValue, setLocationValue] = useState(defaultLocation);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedInterested, setSelectedInterested] = useState([]);
  const [distantValue, setDistantValue] = useState(defaultDistantValue);
  const [ageRange, setAgeRange] = useState(defaultAgeRange);
  const [users, setUsers] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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

  const handleApply = async () => {
    setIsFilterApplied(true);

    try {
      const apiUrl =
        API_ENDPOINT +
        `/api/filter?gender=${selectedGender.join(
          ","
        )}&hobbies=${selectedInterested.join(",")}&city=${encodeURIComponent(
          locationValue
        )}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}`;

      const response = await axios.get(apiUrl);

      console.log("Filtered Users:", {
        selectedGender,
        locationValue,
        selectedInterested,
        ageRange,
      });

      console.log("API Response:", response.data);

      dispatch(setFilteredData(response.data));

      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesApiUrl = API_ENDPOINT + "/api/cities";
        const citiesResponse = await axios.get(citiesApiUrl);
        setCities(citiesResponse.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          API_ENDPOINT +
          `/api/filter?gender=${selectedGender.join(
            ","
          )}&hobbies=${selectedInterested.join(",")}&city=${encodeURIComponent(
            locationValue
          )}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}`;

        console.log("API URL:", apiUrl);

        const response = await axios.get(apiUrl);

        console.log("Filtered Users:", {
          selectedGender,
          locationValue,
          selectedInterested,
          ageRange,
        });

        console.log("API Response:", response.data);

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isFilterApplied) {
      fetchData();
      setIsFilterApplied(false);
    }
  }, [selectedGender, selectedInterested, ageRange, isFilterApplied]);

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
              selectedGender.includes("Male") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("Male")}
          >
            Male
          </button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <button
            className={`gender-button ${
              selectedGender.includes("Female") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("Female")}
          >
            Female
          </button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <button
            style={{ borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
            className={`gender-button ${
              selectedGender.includes("other") ? "selected" : ""
            }`}
            onClick={() => handleGenderClick("other")}
          >
            Other
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
          {cities.map((city) => (
            <option key={city.city} value={city.city}>
              {city.city}
            </option>
          ))}
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
              selectedInterested.includes("1") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("1")}
          >
            Interest 1
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("2") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("2")}
          >
            Interest 2
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("3") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("3")}
          >
            Interest 3
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("4") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("4")}
          >
            Interest 4
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("5") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("5")}
          >
            Interest 5
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("6") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("6")}
          >
            Interest 6
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("7") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("7")}
          >
            Interest 7
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("8") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("8")}
          >
            Interest 8
          </button>
          <button
            className={`filter-button ${
              selectedInterested.includes("9") ? "selected" : ""
            }`}
            onClick={() => handleInterestedClick("9")}
          >
            Interest 9
          </button>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="clear" onClick={handleClear}>
          Clear
        </button>
        <button className="submit" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
