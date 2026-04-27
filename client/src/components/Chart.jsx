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
  AreaChart as ReAreaChart,
  Area,
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

        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

/* ---------------------- AREA CHART ---------------------- */

export const AreaChart = ({ data = [], areas = [] }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReAreaChart data={data}>
        <defs>
          <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {areas.map((area, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={area.key}
            stroke={area.color}
            fillOpacity={1}
            fill="url(#colorOne)"
          />
        ))}
      </ReAreaChart>
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

        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            fill={bar.color}
            radius={[6, 6, 0, 0]}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

/* ---------------------- MULTI LINE CHART ---------------------- */

export const MultiLineChart = ({ data = [], lines = [] }) => {
  return <LineChart data={data} lines={lines} />;
};