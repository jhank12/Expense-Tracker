import React, { useState } from "react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { monthsArr, getMonthData, formattedDate } from "/src/Data/CalendarData";

const BarChartComponent = () => {
  // have select dropdown that shows week or month

  const [chartOption, setChartOption] = useState("week");

  const testData = [
    { xvalue: "Mon", sum: 28 },
    { xvalue: "Tues", sum: 40 },
    { xvalue: "Wed", sum: 60 },
    { xvalue: "Thurs", sum: 30 },
    { xvalue: "Fri", sum: 40 },
    { xvalue: "Sat", sum: 120 },
    { xvalue: "Sun", sum: 60 },
  ];

  const date = new Date();

  // for monthlyTestData
  const monthlyTestData = [];

  // test data for month loop
  let baseMonthSum = 0;
  for (let i = 0; i < monthsArr.length; i++) {
    monthlyTestData.push({ xvalue: monthsArr[i], sum: baseMonthSum });
    baseMonthSum += 10;
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const currentDay: number = date.getDay();

  const weekStartDate = date.getDate() - currentDay;

  const month = date.getMonth();
  const monthDate = date.getDate();
  const year = date.getFullYear();

  const [weekFullStartDate, setWeekFullStartDate] = useState({
    month: month,
    date: weekStartDate,
    year: year,
  });

  function changeWeek(num: number) {
    // makes number either positive or negative
    const weekCountBy = 7 * num;

    const weekStartCopy = weekFullStartDate;
    const { month, date, year } = weekStartCopy;

    const { prevMonthDaysCount, currentMonthDaysCount } =
      getMonthData(weekStartCopy);
    let newWeekFullStart;
    // checks if month change
    if (date + weekCountBy > currentMonthDaysCount || date + weekCountBy < 1) {
      // const nextMonthWeekStart = date + weekCountBy - currentMonthDaysCount;
      const monthCount =
        weekCountBy > 0 ? currentMonthDaysCount : -prevMonthDaysCount;
      const newWeekStart = date + weekCountBy - monthCount;

      if (month + 1 * num > 11) {
        newWeekFullStart = {
          month: 0,
          date: newWeekStart,
          year: year + 1,
        };
      } else if (month + 1 * num < 0) {
        newWeekFullStart = {
          month: 11,
          date: newWeekStart,
          year: year - 1,
        };
      } else {
        newWeekFullStart = {
          month: month + 1 * num,
          date: newWeekStart,
          year: year,
        };
      }
    } else {
      const newDate = date + weekCountBy;
      newWeekFullStart = { month: month, date: newDate, year: year };
    }

    console.log(newWeekFullStart.month);
    setWeekFullStartDate(newWeekFullStart);
  }

  return (
    <div>
      <header className="barChartHeader flex-row">
        <h1>Week of: {formattedDate(weekFullStartDate)}</h1>
        <div className="sectionCounter">
          <button onClick={() => changeWeek(-1)}>{"<--"}</button>
          <button onClick={() => changeWeek(1)}>{"-->"}</button>
        </div>

        <select
          name="barChartSelect"
          id="barChartSelect"
          onChange={(e) => setChartOption(e.target.value)}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>

          <option value="year">Year</option>
        </select>
      </header>

      <LineChart
        width={730}
        height={450}
        data={chartOption === "week" ? testData : monthlyTestData}
      >
        <Tooltip />
        <Line dataKey="sum" fill="#5e39c5" />
        <XAxis dataKey="xvalue" />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default BarChartComponent;
