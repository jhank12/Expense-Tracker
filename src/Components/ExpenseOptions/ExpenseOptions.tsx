import React, { useEffect, useRef } from "react";

import styles from "./ExpenseOptions.module.css";
import Dialog from "../Reusable/Dialog/Dialog";

const ExpenseOptions = ({
  editDialogRef,
  deleteDialogRef,
  setExpenseOptionsOpen,
  isOptionsOpenFunc,

  expenseOptionsDialogRef,
}) => {
  function openDialog(dialogRef) {
    dialogRef.current?.showModal();

    setExpenseOptionsOpen(false);
    isOptionsOpenFunc(false);
  }

  return (
    // <Dialog dialogRef={expenseOptionsDialogRef}>
    <div className={styles.expenseOptions}>
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
