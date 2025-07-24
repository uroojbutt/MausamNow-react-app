import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import "./WeatherChart.css";

const RadarComparisonChart = ({ today }) => {
  const data = [
    { metric: "Humidity", value: today.humidity || 0 },
    { metric: "UV Index", value: today.uv || 0 },
    { metric: "Wind Speed", value: today.wind || 0 },
  ];

  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">💡 Wind, Humidity, UV Comparison</h4>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="metric" stroke="#fff" />
          <PolarRadiusAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
          <Radar name="Today" dataKey="value" stroke="#FF69B4" fill="#FF69B4" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarComparisonChart;
