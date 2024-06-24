import React, { useState, useRef, useEffect } from "react";

// components
import Dialog from "../Reusable/Dialog/Dialog";

const EditExpenseDialog = ({
  expense,
  editExpense,
  editExpenseDialogRef,
  closeDialog,
}) => {
  const { id, expenseName: name, category, amount, expenseType } = expense;

  //   const editExpenseDialogRef = useRef<HTMLDialogElement | null>(null);

  //   maybe have form submit check here to check fields then call the passed in edit expense

  const [expenseNameNew, setExpenseNameNew] = useState<string>(name);
  const [categoryNew, setCategoryNew] = useState<string>(category);
  const [amountNew, setAmountNew] = useState<number>(amount);
  const [expenseTypeNew, setExpenseTypeNew] = useState<string>(expenseType);

  const expenseNameInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const expenseTypeInputRef = useRef<HTMLInputElement>(null);

  function formSubmit(e: Event) {
    e.preventDefault();

    const updatedExpense = {
      id: id,
      expenseName: expenseNameNew,
      category: categoryNew,
      amount: amountNew,
      expenseType: expenseTypeNew,
    };

    //  do value checks to see if different

    editExpense(id, updatedExpense, editExpenseDialogRef);
    //  editExpenseDialogRef.current?.close();
  }

  return (
    <Dialog dialogRef={editExpenseDialogRef}>
      <div className="modalContainer">
        <h2>Edit Expense</h2>

        <form
          action=""
          className="newExpenseForm flex-col"
          onSubmit={formSubmit}
        >
          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Expense Name</label>
            <input
              type="text"
              onChange={(e) => setExpenseNameNew(e.target.value)}
              ref={expenseNameInputRef}
            />
          </div>

          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Category</label>

            <select
              name=""
              id=""
              onChange={(e) => setCategoryNew(e.target.value)}
              ref={categoryInputRef}
            >
              <option value="subscription">Subscription</option>
              <option value="food">Food</option>
              <option value="bill">Bill</option>
              <option value="misc">Misc</option>
            </select>
          </div>

          {/* limit character amount */}
          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Amount</label>
            <input
              type="text"
              onChange={(e) => setAmountNew(Number(e.target.value))}
              ref={amountInputRef}
            />
          </div>

          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Type</label>
            <input
              type="text"
              onChange={(e) => setExpenseTypeNew(e.target.value)}
              ref={expenseTypeInputRef}
            />
          </div>

          <div className="btnsContainer">
            <button className="btnMain" type="submit">
              Update Expense
            </button>
            <button type="reset">Clear Form</button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditExpenseDialog;
