// components/RecentSearches.jsx
import React from "react";
import "./RecentSearches.css";

const RecentSearches = ({ searches, onSelect }) => {
  return (
    <div className="recent-dropdown">
      <ul className="recent-list">
        {searches.map((city, index) => (
          <li
            key={index}
            onMouseDown={() => onSelect(city)} // prevents onBlur hiding it too early
            className="recent-item"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
