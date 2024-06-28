import { useState, useContext, createContext, useId } from "react";

export const ExpensesContext = createContext(null);

import { Expense } from "../Components/ExpensesSection/ExpensesSection";

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: useId(),
      expenseName: "Amazon",
      category: "subscription",
      amount: 19.99,
      expenseType: "deduct",
      // date month is one less than actual. 4 = may
      date: "4-29-2024",
    },

    {
      id: useId(),
      expenseName: "Netflix",
      category: "subscription",
      amount: 15.99,
      expenseType: "deduct",
      date: "4-29-2024",
    },
    {
      id: useId(),
      expenseName: "Refund",
      category: "misc",
      amount: 400.47,
      expenseType: "add",
      date: "4-30-2024",
    },
    {
      id: useId(),
      expenseName: "Doordash",
      category: "food",
      amount: 32.65,
      expenseType: "deduct",
      date: "5-26-2024",
    },
  ]);

  // add dates to expenses

  function addExpense(expense: Expense, dialogRef) {
    setExpenses((prev) => [...prev, expense]);
    console.log(expenses);
    dialogRef.current?.close();
  }

  function editExpense(expenseId: string, updatedExpense: Expense, dialogRef) {
    console.log(updatedExpense);
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
    console.log(expenseId);

    const filteredExpenses = expenses.filter((expense) => {
      return expense.id !== expenseId;
    });

    setExpenses([...filteredExpenses]);

    dialogRef.current?.close();
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
