import React, { useState, useRef, useEffect, useId } from "react";

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

  const addExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [...prev, expense]);

    addExpenseDialogRef.current?.close();
  }

  function editExpense(expenseId: string, updatedExpense: Expense, dialogRef) {
    const expensesCopy = expenses;

    let expenseIdx: number;

    expensesCopy.forEach((expense) => {
      if (expense.id == expenseId) {
        expenseIdx = expenses.indexOf(expense);
      }
    });

    expensesCopy[expenseIdx] = updatedExpense;

    setExpenses([...expensesCopy]);
    dialogRef.current?.close();
  }

  function deleteExpense(expenseId: string, dialogRef) {
    const filteredExpenses = expenses.filter((expense) => {
      return expense.id !== expenseId;
    });

    setExpenses([...filteredExpenses]);

    dialogRef.current?.close();
  }

  useEffect(() => {
    addExpenseDialogRef.current?.addEventListener("click", function (e) {
      if (e.target.className === "dialog") addExpenseDialogRef.current?.close();
    });

    return () => {
      addExpenseDialogRef.current?.removeEventListener(
        "click",
        function (e) {}
      );
    };
  }, []);

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

      {/* add expense */}
      <dialog className="dialog" ref={addExpenseDialogRef}>
        <AddExpenseForm
          addExpense={addExpense}
          setExpenseFormOpen={setExpenseFormOpen}
        />
      </dialog>

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
