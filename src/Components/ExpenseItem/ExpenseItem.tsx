import React, { useState, useRef } from "react";
import styles from "./ExpenseItem.module.css";

// components
import ExpenseOptions from "../ExpenseOptions/ExpenseOptions";
import EditExpenseDialog from "../EditExpenseDialog/EditExpenseDialog";
import DeleteExpenseDialog from "../DeleteExpenseDialog/DeleteExpenseDialog";

const ExpenseItem = ({ expense, editExpense, deleteExpense }) => {
  const { id, expenseName: name, category, amount, expenseType } = expense;

  const categoryCapitalized = category[0].toUpperCase() + category.slice(1);

  const [expenseOptionsOpen, setExpenseOptionsOpen] = useState(false);

  const editExpenseDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  function executeAction(expenseActionFunc) {
    expenseActionFunc(id);
    setExpenseOptionsOpen(false);
  }

  function closeDialog(dialogRef) {
    dialogRef.current?.close();
  }

  return (
    <div className={styles.expenseItem}>
      <div className={styles.expensenNameCategory}>
        <p className={styles.expenseName}>{name}</p>
        <p className={styles.expenseCategory}>{categoryCapitalized}</p>
      </div>
      {/* use conditional styles with regular css not module */}

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
          closeDialog={closeDialog}
        />

        <DeleteExpenseDialog
          expense={expense}
          deleteExpense={deleteExpense}
          deleteExpenseDialogRef={deleteExpenseDialogRef}
          closeDialog={closeDialog}
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
