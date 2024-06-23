import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";
import styles from "./HomePage.module.css";

// Components
import Navbar from "../../Components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Settings from "../Settings/Settings";

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <section className={styles.mainContainer}>
      {navOpen && <Navbar />}

      <main>
        {/* <button onClick={() => setNavOpen(!navOpen)}>nav toggle</button> */}

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </section>
  );
};

export default HomePage;
