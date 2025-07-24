import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./WeatherChart.css";

const RainfallAreaChart = ({ data }) => {
  console.log("Rainfall Chart Data:", data);

  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">☔ Rainfall Trend</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#fff" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
          <Area type="monotone" dataKey="rainfall" stroke="#00CED1" fill="#00CED1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallAreaChart;
