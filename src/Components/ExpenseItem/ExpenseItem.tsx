import React, { useState } from "react";
import styles from "./ExpenseItem.module.css";

const ExpenseItem = ({ expense, editExpense, deleteExpense }) => {
  const { id, expenseName: name, category, amount, expenseType } = expense;

  const categoryCapitalized = category[0].toUpperCase() + category.slice(1);

  const [expenseOptionsOpen, setExpenseOptionsOpen] = useState(false);

  function executeAction(expenseActionFunc) {
    expenseActionFunc(id);
    setExpenseOptionsOpen(false);
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
          class="material-symbols-outlined"
          onClick={() => setExpenseOptionsOpen(!expenseOptionsOpen)}
        >
          more_vert
        </span>

        {expenseOptionsOpen && (
          <div className={styles.expenseOptions}>
            <div
              className={styles.expenseOption}
              onClick={() => executeAction(editExpense)}
            >
              <p>Edit</p>
            </div>
            <div
              className={styles.expenseOption}
              onClick={() => executeAction(deleteExpense)}
            >
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseItem;
