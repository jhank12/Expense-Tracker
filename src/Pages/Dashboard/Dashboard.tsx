import React, { useState } from "react";
import styles from "./Dashboard.module.css";

// router
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

// components
import ExpensesSection from "../../Components/ExpensesSection/ExpensesSection";

import DashboardSection from "../../Components/Reusable/DashboardSection/DashboardSection";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <ExpensesSection />
      <DashboardSection>
        <h2>Chart1</h2>
      </DashboardSection>
      <DashboardSection>
        <h2>Chart2</h2>
      </DashboardSection>
      <DashboardSection>
        <h2>Today's Expenses</h2>
      </DashboardSection>
    </div>
  );
};

export default Dashboard;
