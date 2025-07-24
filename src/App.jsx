import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/ForecastCard"; // Import the forecast component
import SectionHeading from "./components/SectionHeading";
import RecentSearches from "./components/RecentSearches"; // ✅ import component


import { fetchWeatherData, fetchWeatherForecast } from "./services/weatherAPI"; // Import both functions
import Spinner from "./components/Spinner";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherChart from "./components/WeatherChart";
import WeatherBarChart from "./components/WeatherBarChart";
import RainfallAreaChart from "./components/RainfallAreaChart";
import RadarComparisonChart from "./components/RadarComparisonChart";





function App() {
  const [unit, setUnit] = useState("metric"); // Default unit
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); // Add forecast state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(city, unit),
        fetchWeatherForecast(city, unit),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);

      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [city, ...prev.filter((c) => c !== city)].slice(0, 5); // max 5
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(" API error while fetching data or city not found. Please try again");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("New York"); // fetch once
  }, []);
  useEffect(() => {
    if (weather) {
      handleSearch(weather.name); // Re-fetch weather & forecast with new unit
    }
  }, [unit]);


  return (
    <div className="App">
      <Navbar />
      <div className="main-content" style={{ position: "relative" }}>
        <SearchBar onSearch={handleSearch} recentSearches={recentSearches} loading={loading} />

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <div>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center my-4 mx-auto" style={{ width: "30%" }}>{error}</div>
        )}
        {!loading && weather && (
          <>
            <WeatherCard weather={weather} unit={unit} setUnit={setUnit} />
            {/* Add the forecast component below the weather card */}
            <SectionHeading title="6-Day Forecast" />

            <WeatherForecast forecasts={forecast} />
            {forecast.length > 0 && (
              <>
                <WeatherChart data={forecast} />
                <WeatherBarChart data={forecast} />
                <RainfallAreaChart data={forecast} />
              </>
            )}
            {weather && (
              <RadarComparisonChart today={weather} />
            )}
          </>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
      {loading && <Spinner />}
    </div>
  );
}

export default App;