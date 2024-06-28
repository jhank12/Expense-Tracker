import styles from "./ExpenseOptions.module.css";

const ExpenseOptions = ({
  editDialogRef,
  deleteDialogRef,
  setExpenseOptionsOpen,
}) => {
  function openDialog(dialogRef) {
    console.log(dialogRef);
    dialogRef.current?.showModal();

    setExpenseOptionsOpen(false);
  }

  return (
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
  );
};

export default ExpenseOptions;
