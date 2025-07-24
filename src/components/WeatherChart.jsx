import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./WeatherChart.css";

const WeatherLineChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">🌡️ Temperature Trend</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#FFF" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#FFF", border: "none", color: "#fff" }} />
          <Line type="monotone" dataKey="tempMax" stroke="#FF6347" name="High Temp" />
          <Line type="monotone" dataKey="tempMin" stroke="#333" name="Low Temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherLineChart;
