import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./ExpenseItem.module.css";

// components
import ExpenseOptions from "../ExpenseOptions/ExpenseOptions";
import EditExpenseDialog from "../EditExpenseDialog/EditExpenseDialog";
import DeleteExpenseDialog from "../DeleteExpenseDialog/DeleteExpenseDialog";

import { ExpensesContext } from "../../Context/ExpensesContext";

// types

import { Expense } from "../ExpensesSection/ExpensesSection";

const ExpenseItem = ({ expense }) => {
  const { id, expenseName: name, category, amount, expenseType } = expense;

  const categoryCapitalized = category[0].toUpperCase() + category.slice(1);

  const [expenseOptionsOpen, setExpenseOptionsOpen] = useState(false);

  const editExpenseDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  // context
  const { editExpense, deleteExpense } = useContext(ExpensesContext);

  return (
    <div className={styles.expenseItem}>
      <div className={styles.expensenNameCategory}>
        <p className={styles.expenseName}>{name}</p>
        <p className={styles.expenseCategory}>{categoryCapitalized}</p>
      </div>

      <div className={styles.expenseRightSide}>
        {expenseType === "add" ? (
          <p className={styles.expenseAmountAdd}>+${amount}</p>
        ) : (
          <p className={styles.expenseAmountDeduct}>-${amount}</p>
        )}
        <span
          className="material-symbols-outlined"
          onClick={() => setExpenseOptionsOpen(!expenseOptionsOpen)}
        >
          more_vert
        </span>

        <EditExpenseDialog
          expense={expense}
          editExpense={editExpense}
          editExpenseDialogRef={editExpenseDialogRef}
        />

        <DeleteExpenseDialog
          expense={expense}
          deleteExpense={deleteExpense}
          deleteExpenseDialogRef={deleteExpenseDialogRef}
        />

        {expenseOptionsOpen && (
          <ExpenseOptions
            editDialogRef={editExpenseDialogRef}
            deleteDialogRef={deleteExpenseDialogRef}
            setExpenseOptionsOpen={setExpenseOptionsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseItem;
