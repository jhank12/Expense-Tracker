import React from "react";
// import { Chart as ChartJS } from "chart.js/auto";
// import { CategoryScale } from "chart.js";
// ChartJS.register(CategoryScale);
// import { Bar, Pie } from "react-chartjs-2";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BarChartComponent = () => {
  const testData = [
    { name: "Mon", amount: 28 },
    { name: "Tues", amount: 40 },
    { name: "Wed", amount: 60 },
    { name: "Thurs", amount: 30 },
    { name: "Fri", amount: 40 },
    { name: "Sat", amount: 120 },
    { name: "Sun", amount: 60 },
  ];

  return (
    <div>
      {/* <ResponsiveContainer> */}
      <BarChart width={730} height={450} data={testData}>
        <Tooltip />
        <Bar dataKey="amount" fill="#5e39c5" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default BarChartComponent;
