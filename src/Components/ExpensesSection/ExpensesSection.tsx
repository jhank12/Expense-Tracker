import React, { useState, useRef, useEffect, useContext, useId } from "react";

import DashboardSection from "../Reusable/DashboardSection/DashboardSection";
import styles from "./ExpensesSection.module.css";
import AddExpenseForm from "../AddExpenseForm";

import ExpenseItem from "../ExpenseItem/ExpenseItem";

import { ExpensesContext } from "../../Context/ExpensesContext";

import { monthsArr, getMonthData, formattedDate } from "/src/Data/CalendarData";

export type Expense = {
  id: string;
  expenseName: string;
  category: string;
  amount: number;
  expenseType: string;

  date: string;
};

const ExpensesSection = ({
  expenseOptionsOpen,
  setExpenseOptionsOpen,
  isOptionsOpenFunc,
}) => {
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);

  const { expenses } = useContext(ExpensesContext);

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const addExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  const date = new Date();

  // day = day of month not week
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();

  // used to filter expenses and show in header
  const [expensesDate, setExpensesDate] = useState({
    month: currentMonth,
    date: currentDate,
    year: currentYear,
  });

  const expensesDateCopy = expensesDate;

  function dateString(): string {
    const { month, date, year } = expensesDateCopy;

    if (
      month !== currentMonth ||
      date !== currentDate ||
      year !== currentYear
    ) {
      return formattedDate(expensesDateCopy);
    } else {
      return "Todays Expenses";
    }
  }

  function cycleDate(num: number) {
    const { month, date, year } = expensesDateCopy;

    const { prevMonthDaysCount, currentMonthDaysCount } =
      getMonthData(expensesDateCopy);

    // either positive or negative. changes depending on button click
    const countBy = 1 * num;

    let newDate: number;

    if (date + countBy > currentMonthDaysCount || date + countBy < 1) {
      // checks if incrementing or not
      if (countBy > 0) {
        if (month + 1 > 11) {
          setExpensesDate((prev) => ({
            month: 0,
            date: 1,
            year: year + 1,
          }));
        } else {
          setExpensesDate((prev) => ({
            ...prev,
            month: month + 1,
            date: 1,
          }));
        }
      } else {
        if (month - 1 < 0) {
          setExpensesDate((prev) => ({
            month: 11,
            date: prevMonthDaysCount,
            year: year - 1,
          }));
        } else {
          setExpensesDate((prev) => ({
            ...prev,
            month: month - 1,
            date: prevMonthDaysCount,
          }));
        }
      }
    } else {
      setExpensesDate((prev) => ({
        ...prev,
        date: date + countBy,
      }));
    }
  }

  function filterExpenses() {
    let date: string = "";

    Object.keys(expensesDate).forEach((key) => {
      console.log(expensesDate[key]);

      if (key === "year") return (date += `${expensesDate[key]}`);

      date += `${expensesDate[key]}-`;
    });

    const expensesFiltered = expenses.filter((expense) => {
      return expense.date === date;
    });

    setFilteredExpenses([...expensesFiltered]);
  }

  useEffect(() => {
    filterExpenses();
  }, [expensesDate, expenses]);

  return (
    <DashboardSection>
      <header>
        <h2>{dateString()}</h2>

        <div className="sectionCounter">
          <button onClick={() => cycleDate(-1)}>{"<--"}</button>
          <button onClick={() => cycleDate(1)}>{"-->"}</button>
        </div>
      </header>
      <div className={styles.expensesContainer}>
        {filteredExpenses.map((expense) => (
          <ExpenseItem expense={expense} />
        ))}
      </div>

      <AddExpenseForm
        dialogRef={addExpenseDialogRef}
        setExpenseFormOpen={setExpenseFormOpen}
      />

      <div className={styles.newExpenseBtnContainer}>
        <button
          className="btnMain"
          onClick={() => addExpenseDialogRef.current?.showModal()}
        >
          Add Expense
        </button>
      </div>
    </DashboardSection>
  );
};

export default ExpensesSection;
