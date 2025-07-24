import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import "./WeatherChart.css";

const WeatherBarChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">📊 High vs Low Temperature</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff", border: "none" }} />
          <Bar dataKey="tempMax" fill="#FFA07A" name="High" />
          <Bar dataKey="tempMin" fill="#87CEFA" name="Low" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherBarChart;
