import React, { useState, useRef, useEffect, useContext, useId } from "react";

import DashboardSection from "../Reusable/DashboardSection/DashboardSection";
import styles from "./ExpensesSection.module.css";
import AddExpenseForm from "../AddExpenseForm";

import ExpenseItem from "../ExpenseItem/ExpenseItem";

import { ExpensesContext } from "../../Context/ExpensesContext";

export type Expense = {
  id: string;
  expenseName: string;
  category: string;
  amount: number;
  expenseType: string;
};

const ExpensesSection = ({
  expenseOptionsOpen,
  setExpenseOptionsOpen,
  isOptionsOpenFunc,
}) => {
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);

  const { expenses } = useContext(ExpensesContext);

  const addExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <DashboardSection>
      <h2>Today's Expenses</h2>

      <div className={styles.expensesContainer}>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              // editExpense={editExpense}
              // deleteExpense={deleteExpense}
              // for expense option click
              // expenseOptionsOpen={expenseOptionsOpen}
              // setExpenseOptionsOpen={setExpenseOptionsOpen}

              isOptionsOpenFunc={isOptionsOpenFunc}
            />
          );
        })}
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
