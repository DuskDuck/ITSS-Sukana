import React, { useState, useEffect } from "react";
import axios from "redaxios";
import "./filter.css";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilteredData } from "../../redux/action";

import API_ENDPOINT from "./apiConfig";

const Filter = ({ setIsFilterVisible }) => {
  const defaultAgeRange = [0, 40];
  const defaultLocation = "All";

  const userId = localStorage.getItem("id");
  const [locationValue, setLocationValue] = useState(defaultLocation);
  const [selectedGender, setSelectedGender] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [ageRange, setAgeRange] = useState(defaultAgeRange);
  const [users, setUsers] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [cities, setCities] = useState([]);
  const [filterKey, setFilterKey] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsFilterVisible(false);
    navigate("/");
  };

  const handleGenderClick = (gender) => {
    setSelectedGender([gender]);
  };

  const handleHobbiesClick = (hobby) => {
    setSelectedHobbies((prevSelected) =>
      prevSelected.includes(hobby)
        ? prevSelected.filter((item) => item !== hobby)
        : [...prevSelected, hobby]
    );
  };

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  };

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleClear = () => {
    setSelectedGender([]);
    setSelectedHobbies([]);
    setAgeRange(defaultAgeRange);
    setLocationValue(defaultLocation);
  };

  const handleApply = async () => {
    setIsFilterApplied(true);

    try {
      const selectedHobbiesIds = selectedHobbies.map((hobbyId) =>
        parseInt(hobbyId)
      );

      const cityParam = locationValue === "All" ? "" : locationValue;

      const apiUrl =
        API_ENDPOINT +
        `/api/filter?gender=${selectedGender.join(
          ","
        )}&hobbies=${selectedHobbiesIds.join(",")}&city=${encodeURIComponent(
          cityParam
        )}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}&userId=${userId}`;

      const response = await axios.get(apiUrl);

      console.log("Filtered Users:", {
        selectedGender,
        locationValue,
        selectedHobbies,
        ageRange,
      });

      console.log("API Response:", response.data);
      if (response.data.length === 0) {
        alert("Không tìm thấy người dùng phù hợp");
      } else {
        dispatch(setFilteredData(response.data));
        setIsFilterVisible(false);
        setFilterKey((prevKey) => prevKey + 1);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesApiUrl = API_ENDPOINT + "/api/cities";
        const citiesResponse = await axios.get(citiesApiUrl);
        const allLocationsOption = { city: "All" };
        setCities([allLocationsOption, ...citiesResponse.data]);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [filterKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          API_ENDPOINT +
          `/api/filter?gender=${selectedGender.join(
            ","
          )}&hobbies=${selectedHobbies.join(",")}&city=${encodeURIComponent(
            locationValue
          )}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}&userId=${userId}`;

        console.log("API URL:", apiUrl);

        const response = await axios.get(apiUrl);

        console.log("Filtered Users:", {
          selectedGender,
          locationValue,
          selectedHobbies,
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
  }, [
    selectedGender,
    selectedHobbies,
    ageRange,
    isFilterApplied,
    locationValue,
    filterKey,
  ]);
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const hobbiesApiUrl = API_ENDPOINT + "/api/hobbies";
        const hobbiesResponse = await axios.get(hobbiesApiUrl);
        setHobbies(hobbiesResponse.data);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    fetchHobbies();
  }, [filterKey]);
  return (
    <div className="filter-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div className="filter-title">Filter</div>
      <div className="row">
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
        <div className="age-value">{`${ageRange[0]} - ${ageRange[1]} tuổi`}</div>
      </div>
      <div className="filter-section">
        <div className="filter-subtitle">Hobbies</div>
        <div className="filter-options">
          {hobbies.map((hobby) => (
            <button
              key={hobby.id}
              className={`filter-button ${
                selectedHobbies.includes(hobby.id.toString()) ? "selected" : ""
              }`}
              onClick={() => handleHobbiesClick(hobby.id.toString())}
            >
              {hobby.name}
            </button>
          ))}
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
