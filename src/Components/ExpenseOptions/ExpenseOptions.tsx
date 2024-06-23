import React from "react";

import styles from "./ExpenseOptions.module.css";

const ExpenseOptions = ({
  editExpense,
  deleteExpense,

  editDialogRef,
  deleteDialogRef,
  executeAction,
}) => {
  return (
    <div className={styles.expenseOptions}>
      <div
        className={styles.expenseOption}
        onClick={() => editDialogRef.current?.showModal()}
      >
        <p>Edit</p>
      </div>
      <div
        className={styles.expenseOption}
        onClick={() => deleteDialogRef.current?.showModal()}
      >
        <p>Delete</p>
      </div>
    </div>
  );
};

export default ExpenseOptions;
