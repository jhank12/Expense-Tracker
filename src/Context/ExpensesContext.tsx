import { useState, useContext, createContext, useId } from "react";

export const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: useId(),
      expenseName: "Amazon",
      category: "subscription",
      amount: 19.99,
      expenseType: "deduct",
    },

    {
      id: useId(),
      expenseName: "Netflix",
      category: "subscription",
      amount: 15.99,
      expenseType: "deduct",
    },
    {
      id: useId(),
      expenseName: "Refund",
      category: "misc",
      amount: 400.47,
      expenseType: "add",
    },
    {
      id: useId(),
      expenseName: "Doordash",
      category: "food",
      amount: 32.65,
      expenseType: "deduct",
    },
  ]);

  function addExpense(expense: Expense, dialogRef) {
    setExpenses((prev) => [...prev, expense]);

    dialogRef.current?.close();
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

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
