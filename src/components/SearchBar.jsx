import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "./SearchBar.css";
import RecentSearches from "./RecentSearches";

const SearchBar = ({ onSearch, recentSearches, loading }) => {
  const [city, setCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();//prevent page form refreshing
    if (!city.trim()) { //remove extra spaces in string
      toast.error("Please enter a city name");
      return;
    }
    onSearch(city);
    setCity("");
    setShowDropdown(false);
  };

  const handleSelectRecent = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowDropdown(false);
  };

  return (
    <div className="search-wrapper">
      <form  className="search-form" autoComplete="off">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        <button type="submit" onClick={handleSubmit} className="search-icon-btn">
          <FaSearch size={16} />
        </button>
        {/* ✅ Dropdown is inside form wrapper for alignment */}
        {showDropdown && !loading && recentSearches.length > 0 && (
          <RecentSearches searches={recentSearches} onSelect={handleSelectRecent} />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
