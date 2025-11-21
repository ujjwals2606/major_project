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

/* ---------------------- COMMON CHART WRAPPER ---------------------- */

const ChartWrapper = ({ title, children }) => (
  <div className="w-full bg-white shadow-md rounded-lg p-4 mb-5">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="w-full h-64">{children}</div>
  </div>
);

/* ---------------------- LINE CHART COMPONENT ---------------------- */

const LineChartComponent = ({ data, dataKeyX, dataKeyY }) => (
  <ChartWrapper title="Line Chart">
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKeyY} stroke="#4f46e5" strokeWidth={3} />
      </ReLineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ---------------------- BAR CHART COMPONENT ---------------------- */

const BarChartComponent = ({ data, dataKeyX, dataKeyY }) => (
  <ChartWrapper title="Bar Chart">
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKeyY} fill="#4f46e5" />
      </ReBarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ---------------------- MULTI-LINE CHART COMPONENT ---------------------- */

const MultiLineChartComponent = ({ data, lines, dataKeyX }) => (
  <ChartWrapper title="Multi Line Chart">
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />

        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={3}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

/* ---------------------- EXPORTS ---------------------- */

export const LineChart = LineChartComponent;
export const BarChart = BarChartComponent;
export const MultiLineChart = MultiLineChartComponent;

export default {
  LineChart,
  BarChart,
  MultiLineChart,
};
