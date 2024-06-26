import React, { useState } from "react";
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

  // maybe have full month name if grid section is bigger.
  // current problem with full names is some dont show on chart (not enough room)
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();

  // for monthlyTestData
  const monthlyTestData = [];

  // test data for month loop
  let baseMonthSum = 0;

  for (let i = 0; i < monthsArr.length; i++) {
    baseMonthSum += 10;
    monthlyTestData.push({ xvalue: monthsArr[i], sum: baseMonthSum });
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const currentDay: number = date.getDay();

  const weekStartDate = date.getDate() - currentDay;
  // const [weekFullStartDate, setWeekFullStartDate] = useState(
  //   `${monthsArr[date.getMonth()]} ${weekStartDate} ${date.getFullYear()}`
  // );

  const month = date.getMonth();
  const monthDate = date.getDate();
  const year = date.getFullYear();

  const [weekFullStartDate, setWeekFullStartDate] = useState({
    month: month,
    date: weekStartDate,
    year: year,
  });

  const [weekCount, setWeekCount] = useState(0);

  // const [ weekCountBy, setWeekCount  ]

  // currently returns the amount of days
  function getMonthData() {
    // const monthStart = new Date(`${monthsArr[month]} 1, ${year}`);
    // const nextMonthStart = new Date(`${monthsArr[month + 1]} 1, ${year}`);
    const weekStartDateCopy = weekFullStartDate;

    const { month, date: day, year } = weekStartDateCopy;
    console.log(month);

    let prevMonthStart = new Date(`${monthsArr[month - 1]} 1, ${year}`);

    // problem is current month
    const currentMonthStart = new Date(`${monthsArr[month]} 1, ${year}`);

    let nextMonthStart = new Date(`${monthsArr[month + 1]} 1, ${year}`);

    if (month === 11) {
      nextMonthStart = new Date(`${monthsArr[0]} 1, ${year + 1}`);
    }

    if (month === 0) {
      prevMonthStart = new Date(`${monthsArr[11]} 1, ${year - 1}`);
    }

    // if next month > 11 next month = 0 and year + 1
    // if prev month < 0 set to 11 and year to year - 1

    const prevMonthDaysCount = Math.round(
      (currentMonthStart.getTime() - prevMonthStart.getTime()) / 86400000
    );

    const currentMonthDaysCount = Math.round(
      (nextMonthStart.getTime() - currentMonthStart.getTime()) / 86400000
    );

    return {
      prevMonthDaysCount: prevMonthDaysCount,
      currentMonthDaysCount: currentMonthDaysCount,
    };
    // return monthDaysCount;
  }

  // called by buttons below
  function changeWeek(num: number) {
    // the num parameter is either positive 1 or negative one and the weekCountBy is multiplied by it
    // find better name for it

    // makes number either positive or negative
    const weekCountBy = 7 * num;

    const weekStartCopy = weekFullStartDate;
    const { month, date, year } = weekStartCopy;

    const { prevMonthDaysCount, currentMonthDaysCount } = getMonthData();
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

  function formedDate(): string {
    return `${monthsArr[weekFullStartDate.month]} ${weekFullStartDate.date}, ${
      weekFullStartDate.year
    }`;
  }

  return (
    <div>
      {/* <ResponsiveContainer> */}

      <header className="barChartHeader flex-row">
        <h1>Week of: {formedDate()}</h1>
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

      <BarChart
        width={730}
        height={450}
        data={chartOption === "week" ? testData : monthlyTestData}
      >
        <Tooltip />
        <Bar dataKey="sum" fill="#5e39c5" />
        <XAxis dataKey="xvalue" />
        <YAxis />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default BarChartComponent;
