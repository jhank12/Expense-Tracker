import React, { useEffect, useRef, useContext } from "react";

import styles from "./ExpenseOptions.module.css";
import Dialog from "../Reusable/Dialog/Dialog";

import EditExpenseDialog from "../EditExpenseDialog/EditExpenseDialog";
import DeleteExpenseDialog from "../DeleteExpenseDialog/DeleteExpenseDialog";

import { ExpensesContext } from "../../Context/ExpensesContext";

const ExpenseOptions = ({
  expense,
  editDialogRef,
  deleteDialogRef,
  setExpenseOptionsOpen,
  isOptionsOpenFunc,

  expenseOptionsDialogRef,
}) => {
  // const editExpenseDialogRef = useRef<HTMLDialogElement | null>(null);
  // const deleteExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  function openDialog(dialogRef) {
    console.log(dialogRef);
    dialogRef.current?.showModal();

    setExpenseOptionsOpen(false);
    // isOptionsOpenFunc(false);
  }

  // const { editExpense, deleteExpense } = useContext(ExpensesContext);

  return (
    // <Dialog dialogRef={expenseOptionsDialogRef}>
    <div className={styles.expenseOptions}>
      {/* <EditExpenseDialog
        expense={expense}
        editExpense={editExpense}
        editExpenseDialogRef={editExpenseDialogRef}
      />

      <DeleteExpenseDialog
        expense={expense}
        deleteExpense={deleteExpense}
        deleteExpenseDialogRef={deleteExpenseDialogRef}
      /> */}
      <div
        className={styles.expenseOption}
        onClick={() => openDialog(editDialogRef)}
      >
        <p>Edit</p>
      </div>
      <div
        className={styles.expenseOption}
        onClick={() => openDialog(deleteDialogRef)}
      >
        <p>Delete</p>
      </div>
    </div>
    // </Dialog>
  );
};

export default ExpenseOptions;
