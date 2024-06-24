import React, { useEffect } from "react";

const DeleteExpenseDialog = ({
  expense,
  deleteExpense,
  deleteExpenseDialogRef,
  closeDialog,
}) => {
  useEffect(() => {
    deleteExpenseDialogRef.current?.addEventListener("click", function (e) {
      if (e.target.className === "dialog") closeDialog(deleteExpenseDialogRef);
    });

    return () => {
      deleteExpenseDialogRef.current?.removeEventListener(
        "click",
        function (e) {}
      );
    };
  }, []);

  return (
    <dialog className="dialog" ref={deleteExpenseDialogRef}>
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
    </dialog>
  );
};

export default DeleteExpenseDialog;
