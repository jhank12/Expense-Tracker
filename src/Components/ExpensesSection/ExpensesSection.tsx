import React, { useState, useId } from "react";

import DashboardSection from "../Reusable/DashboardSection/DashboardSection";
import styles from "./ExpensesSection.module.css";
import AddExpenseForm from "../AddExpenseForm";

import ExpenseItem from "../ExpenseItem/ExpenseItem";

type Expense = {
  id: string;
  expenseName: string;
  category: string;
  amount: number;
  expenseType: string;
};

const ExpensesSection = () => {
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);

  const [expenses, setExpenses] = useState([
    {
      id: useId(),
      expenseName: "Amazon",
      category: "Subscription",
      amount: 19.99,
      expenseType: "deduct",
    },

    {
      id: useId(),
      expenseName: "Netflix",
      category: "Subscription",
      amount: 15.99,
      expenseType: "deduct",
    },
    {
      id: useId(),
      expenseName: "Refund",
      category: "Misc",
      amount: 40.47,
      expenseType: "add",
    },
    {
      id: useId(),
      expenseName: "Doordash",
      category: "Food",
      amount: 32.65,
      expenseType: "deduct",
    },
  ]);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [...prev, expense]);

    setExpenseFormOpen(false);
  }

  function editExpense(expenseId: string) {
    // set name on click, in future have modal

    const expensesCopy = expenses;

    let expenseIdx: number;

    expensesCopy.forEach((expense) => {
      if (expense.id == expenseId) {
        expenseIdx = expenses.indexOf(expense);
      }
    });

    const expense: Expense = expensesCopy[expenseIdx];

    expense.expenseName = "New name";
    console.log(expensesCopy);

    setExpenses(expensesCopy);
  }

  function deleteExpense(expenseId: string) {
    const filteredExpenses = expenses.filter((expense) => {
      return expense.id !== expenseId;
    });

    setExpenses(filteredExpenses);
  }

  return (
    <DashboardSection>
      <h2>Today's Expenses</h2>

      <div className={styles.expensesContainer}>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              editExpense={editExpense}
              deleteExpense={deleteExpense}
            />
          );
        })}
      </div>

      {expenseFormOpen && <AddExpenseForm addExpense={addExpense} />}

      <div className={styles.newExpenseBtnContainer}>
        <button className="btnMain" onClick={() => setExpenseFormOpen(true)}>
          Add Expense
        </button>
      </div>
    </DashboardSection>
  );
};

export default ExpensesSection;
