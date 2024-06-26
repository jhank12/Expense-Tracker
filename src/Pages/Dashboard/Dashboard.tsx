import React, { useState, useId, createContext } from "react";
import styles from "./Dashboard.module.css";

// router
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
ChartJS.register(CategoryScale);
import { Bar, Pie } from "react-chartjs-2";

// components
import ExpensesSection from "../../Components/ExpensesSection/ExpensesSection";

import DashboardSection from "../../Components/Reusable/DashboardSection/DashboardSection";

// export const ExpensesContext = createContext([]);

import ExpensesContextProvider from "../../Context/ExpensesContext";
import BarChartComponent from "../../Components/Charts/BarChart";
import PieChartComponent from "../../Components/Charts/PieChart";

const Dashboard = ({
  expenseOptionsOpen,
  setExpenseOptionsOpen,
  isOptionsOpenFunc,
}) => {
  // chart data = {labels:[], data:[]}

  // const data = {
  //   labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  //   datasets: [10, 20, 30, 40, 50, 60],
  // };

  // need bar chart and pie/donut chart

  // bar chart is for daily averages of the week, pie chart will be for expense categories

  // Food
  // Subscriptions
  // Bills
  // Clothing
  // Auto
  // Healthcare
  // Pet

  // const [expenses, setExpenses] = useState([
  //   {
  //     id: useId(),
  //     expenseName: "Amazon",
  //     category: "Subscription",
  //     amount: 19.99,
  //     expenseType: "deduct",
  //   },

  //   {
  //     id: useId(),
  //     expenseName: "Netflix",
  //     category: "Subscription",
  //     amount: 15.99,
  //     expenseType: "deduct",
  //   },
  //   {
  //     id: useId(),
  //     expenseName: "Refund",
  //     category: "Misc",
  //     amount: 400.47,
  //     expenseType: "add",
  //   },
  //   {
  //     id: useId(),
  //     expenseName: "Doordash",
  //     category: "Food",
  //     amount: 32.65,
  //     expenseType: "deduct",
  //   },
  // ]);

  // expenses context start

  // expenses context end
  const [sectionCounter, setSectionCounter] = useState(1);

  // section items is what changes on counter change
  const sectionItems = [<BarChartComponent />, <PieChartComponent />];

  function incrementCount() {
    if (sectionCounter + 1 < sectionItems.length) {
      setSectionCounter((count) => count + 1);
    } else {
      setSectionCounter(0);
    }
  }

  function decrementCount() {
    if (sectionCounter - 1 < 0) {
      setSectionCounter(sectionItems.length - 1);
    } else {
      setSectionCounter((count) => count - 1);
    }
  }

  return (
    <ExpensesContextProvider>
      <section className={styles.dashboardContainer}>
        <ExpensesSection
          // for expense option click
          // expenseOptionsOpen={expenseOptionsOpen}
          // setExpenseOptionsOpen={setExpenseOptionsOpen}

          isOptionsOpenFunc={isOptionsOpenFunc}
        />

        <DashboardSection>
          <header className="sectionHeader flex-row">
            <h2>Chart1</h2>
            <div className="sectionCounter">
              <button onClick={() => decrementCount()}>{"<--"}</button>
              <button onClick={() => incrementCount()}>{"-->"}</button>
            </div>
          </header>

          <div className="chartsContainer">
            {sectionItems.filter((_, idx) => {
              return idx === sectionCounter;
            })}
          </div>
        </DashboardSection>
        <DashboardSection>
          <h2>Chart2</h2>
        </DashboardSection>
        <DashboardSection>
          <h2>Today's Expenses</h2>
        </DashboardSection>
      </section>
    </ExpensesContextProvider>
  );
};

export default Dashboard;
