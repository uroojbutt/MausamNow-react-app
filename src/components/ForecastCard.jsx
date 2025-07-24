import React from "react";
import { FaTint } from "react-icons/fa";
import { WiRain, WiStrongWind } from "react-icons/wi";
import "./ForecastCard.css";

const ForecastCard = ({ forecast }) => {
  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <div className="forecast-date">{forecast.date}</div>
      </div>
      <div className="forecast-content">
        <div className="forecast-icon">
          <img
            src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
            alt="weather"
            className="forecast-weather-icon"
          />
        </div>
        <div className="forecast-temps">
          <span className="forecast-temp-high">↑ High: {forecast.tempMax}°</span>
          <span className="forecast-temp-low">↓ Low: {forecast.tempMin}°</span>
        </div>
      </div>
      <div className="forecast-description">{forecast.description}</div>
    </div>
  );
};

const WeatherForecast = ({ forecasts }) => {
  console.log("Forecasts Received:", forecasts);

  if (!forecasts || forecasts.length === 0) {
    return null;
  }

  // Split forecasts into two rows: first 3 and next 3
  const firstRow = forecasts.slice(0, 3);
  const secondRow = forecasts.slice(3, 6);
//   console.log("firstRow:", firstRow.length, firstRow);
// console.log("secondRow:", secondRow.length, secondRow);


  return (
    <div className="forecast-section">
      {/* <h4 className="forecast-title">6-Day Forecast</h4> */}
      {/* <h4 className="forecast-title" style={{ marginBottom: "1rem", textAlign: "center" }}>
        6-Day Forecast
      </h4> */}
      <div className="forecast-cards-wrapper">
        {firstRow.map((forecast, index) => (
          <ForecastCard key={index} forecast={forecast} />
        ))}
      </div>
      {secondRow.length > 0 && (
        <div className="forecast-cards-wrapper">
          {secondRow.map((forecast, index) => (
            <ForecastCard key={index + 3} forecast={forecast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;