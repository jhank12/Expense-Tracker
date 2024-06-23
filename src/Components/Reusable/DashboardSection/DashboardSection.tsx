import React from "react";
import styles from "./DashboardSection.module.css";

const DashboardSection = ({ children }) => {
  return <div className={styles.dashboardSection}>{children}</div>;
};

export default DashboardSection;
