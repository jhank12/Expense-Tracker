import React, { useState, useRef, useId } from "react";

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
  const editExpenseDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [...prev, expense]);

    addExpenseDialogRef.current?.close();
  }

  // expense option selection opens the corresponding dialog box.
  // on click open dialog ref and pass in the edit or delete expense function to the modal

  function editExpense(expenseId: string, updatedExpense: Expense, dialogRef) {
    const expensesCopy = expenses;

    let expenseIdx: number;

    expensesCopy.forEach((expense) => {
      if (expense.id == expenseId) {
        expenseIdx = expenses.indexOf(expense);
      }
    });

    // const expense: Expense = expensesCopy[expenseIdx];

    // expense.expenseName = "New name";
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
              editDialogRef={editExpenseDialogRef}
              deleteDialogRef={deleteExpenseDialogRef}
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

      {/* edit expense dialog */}

      <dialog ref={editExpenseDialogRef}></dialog>

      {/* delete expense dialog */}

      {/* <dialog className="dialog" ref={deleteExpenseDialogRef}>
        <div className="modalContainer">
          <h2>Delete Expense</h2>

          <p>This action is permanent and cannot be undone.</p>

          <div>
            <button className="btnMain" onClick={() => deleteExpense()}>
              Delete Expense
            </button>
            <button onClick={() => closeDialog(deleteExpenseDialogRef)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog> */}

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
