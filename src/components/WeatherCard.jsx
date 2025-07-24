// WeatherCard.jsx
import React from "react";
import { FaTint } from "react-icons/fa";
import { WiRain, WiDaySunny, WiStrongWind } from "react-icons/wi";
import { GiDustCloud } from "react-icons/gi";
import "./WeatherCard.css";

const WeatherCard = ({ weather, unit, setUnit }) => {
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="weather-container container">
      <div className="row align-items-center">
        {/* LEFT */}
        <div className="col-md-6 left-section">
          <h3 className="city-name">📍 {weather.name}</h3>
          <p className="date-time">📅 {weather.time}</p>

          <div className="temp-toggle-container">
            <h1 className="temperature">
              {weather.temp}°{unit === "metric" ? "C" : "F"}
            </h1>
            <button className="unit-toggle-small" onClick={toggleUnit}>
              {unit === "metric" ? "°F" : "°C"}
            </button>
          </div>

          <p className="weather-desc">{weather.description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather"
            className="weather-icon"
          />
        </div>

        {/* RIGHT */}
        <div className="col-md-6 right-section d-flex flex-wrap justify-content-center">
          <div className="info-box">
            <WiStrongWind size={30} style={{ marginBottom: 4, color: "#ffffff" }} />
            {weather.wind} Km/h<br /><small>Wind Speed</small>
          </div>
          <div className="info-box">
            <GiDustCloud size={26} style={{ marginBottom: 4, color: "#ffffff" }} />
            {weather.aqi}<br /><small>Moderate AQI</small>
          </div>
          <div className="info-box">
            <WiRain size={30} style={{ marginBottom: 4, color: "#ffffFF" }} />
            {weather.rainfall ?? 0} mm<br /><small>Rainfall</small>
          </div>
          <div className="info-box">
            <FaTint size={22} style={{ marginBottom: 4, color: "#FFFFFF" }} />
            {weather.humidity}%<br /><small>Humidity</small>
          </div>
          <div className="info-box">
            <WiDaySunny size={30} style={{ marginBottom: 4, color: "#FFffff" }} />
            {weather.uv}<br /><small>UV Index</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
