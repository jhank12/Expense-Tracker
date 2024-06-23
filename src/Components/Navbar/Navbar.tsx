import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <section className={styles.navbar}>
      <h2>project name</h2>

      <nav>
        <Link to="/dashboard">
          <div className={styles.iconTest} />
          Dashboard
        </Link>

        <Link to="/settings">
          <div className={styles.iconTest} />
          Settings
        </Link>
      </nav>
    </section>
  );
};

export default Navbar;
