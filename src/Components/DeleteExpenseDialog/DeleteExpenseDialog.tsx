import React, { useEffect } from "react";

// components
import Dialog from "../Reusable/Dialog/Dialog";

const DeleteExpenseDialog = ({
  expense,
  deleteExpense,
  deleteExpenseDialogRef,
}) => {
  return (
    <Dialog dialogRef={deleteExpenseDialogRef}>
      <div className="modalContainer deleteExpenseDialog">
        <h2>Delete Expense</h2>

        <p>This action is permanent and cannot be undone.</p>

        {/* make different containers for button groups (like side by side and top bottom) */}
        <div className="btnsContainerHorizontal">
          <button onClick={() => deleteExpenseDialogRef.current?.close()}>
            Cancel
          </button>
          <button
            className="btnMain"
            onClick={() => deleteExpense(expense.id, deleteExpenseDialogRef)}
          >
            Delete Expense
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteExpenseDialog;
