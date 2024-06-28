import React, { useState, useEffect, useRef } from "react";

import { Routes, Route } from "react-router-dom";
import styles from "./HomePage.module.css";

// Components
import Navbar from "../../Components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Settings from "../Settings/Settings";

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(true);

  // test
  // const [expenseOptionsOpen, setExpenseOptionsOpen] = useState(false);

  // have variable to detect options open but not expenseOptionsopen variable

  const [optionsOpen, setOptionsOpen] = useState(false);

  const homePageRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (!optionsOpen) return;

  //   const homeRefCopy = homePageRef;

  //   homePageRef.current?.addEventListener("click", function (e) {
  //     console.log(e.target);
  //   });

  //   return () => {
  //     homeRefCopy.current?.removeEventListener("click", function (e) {
  //       console.log(e.target);
  //     });
  //   };
  // }, [optionsOpen]);

  function isExpenseOptionsOpen(expenseOptionsOpen: boolean) {
    setOptionsOpen(expenseOptionsOpen);
  }

  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const month = monthsArr[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <section className={styles.mainContainer} ref={homePageRef}>
      {navOpen && <Navbar />}

      <main>
        {/* <button onClick={() => setNavOpen(!navOpen)}>nav toggle</button> */}

        {/* <h1>
          Today is {month} {day} {year}
        </h1> */}

        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard isOptionsOpenFunc={isExpenseOptionsOpen} />}
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </section>
  );
};

export default HomePage;
