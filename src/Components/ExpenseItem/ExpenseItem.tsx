import React, { useState, useRef } from "react";
import styles from "./ExpenseItem.module.css";

import ExpenseOptions from "../ExpenseOptions/ExpenseOptions";
import EditExpenseDialog from "../EditExpenseDialog/EditExpenseDialog";

const ExpenseItem = ({
  expense,
  editExpense,
  deleteExpense,
  // editDialogRef,
  // deleteDialogRef,
}) => {
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
        />

        <dialog className="dialog" ref={deleteExpenseDialogRef}>
          <div className="modalContainer">
            <h2>Delete Expense</h2>

            <p>This action is permanent and cannot be undone.</p>

            <div>
              <button
                className="btnMain"
                onClick={() => deleteExpense(id, deleteExpenseDialogRef)}
              >
                Delete Expense
              </button>
              <button onClick={() => closeDialog(deleteExpenseDialogRef)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>

        {expenseOptionsOpen && (
          <ExpenseOptions
            editExpense={editExpense}
            deleteExpense={deleteExpense}
            executeAction={executeAction}
            editDialogRef={editExpenseDialogRef}
            deleteDialogRef={deleteExpenseDialogRef}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseItem;
