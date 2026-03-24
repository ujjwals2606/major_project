import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
} from "recharts";

/* ---------------------- LINE CHART ---------------------- */

export const LineChart = ({ data = [], lines = [] }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {lines?.map((line, index) => (
          <Line
            key={index}
            type="monotone" // 🔥 curved line
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

/* ---------------------- BAR CHART ---------------------- */

export const BarChart = ({ data = [], bars = [] }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {bars?.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            fill={bar.color}
            radius={[6, 6, 0, 0]} // 🔥 rounded bars
            animationDuration={800}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

/* ---------------------- MULTI LINE CHART ---------------------- */

export const MultiLineChart = ({ data = [], lines = [] }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {lines?.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};