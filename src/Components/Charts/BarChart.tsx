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
  CartesianGrid,
  CartesianAxis,
} from "recharts";

const BarChartComponent = () => {
  const testData = [
    { day: "Mon", dailySum: 28 },
    { day: "Tues", dailySum: 40 },
    { day: "Wed", dailySum: 60 },
    { day: "Thurs", dailySum: 30 },
    { day: "Fri", dailySum: 40 },
    { day: "Sat", dailySum: 120 },
    { day: "Sun", dailySum: 60 },
  ];

  const date = new Date();

  console.log(date.getDay());

  // get dates for the entire week
  // have similar function as pie chart but calculate all daily expenses regardless of category

  return (
    <div>
      {/* <ResponsiveContainer> */}
      <BarChart width={730} height={450} data={testData}>
        <Tooltip />
        <Bar dataKey="dailySum" fill="#5e39c5" />
        <XAxis dataKey="day" />
        <YAxis />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default BarChartComponent;
