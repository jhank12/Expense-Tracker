import React, { useState, useRef, useEffect, useContext } from "react";

// components
import Dialog from "./Reusable/Dialog/Dialog";

// context
import { ExpensesContext } from "../Context/ExpensesContext";

const AddExpenseForm = ({ dialogRef, setExpenseFormOpen }) => {
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("subscription");
  const [amount, setAmount] = useState(0.0);
  const [expenseType, setExpenseType] = useState("");

  // input refs
  const expenseNameRef = useRef(null);
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const expenseTypeRef = useRef(null);

  // context
  const { addExpense } = useContext(ExpensesContext);

  function clearFormInputs(): void {
    expenseNameRef.current.value = "";
    categoryRef.current.value = "subscription";
    amountRef.current.value = "";
    expenseTypeRef.current.value = "";

    setExpenseName("");
    setCategory("subscription");
    setAmount(0.0);
    setExpenseType("");
  }

  function formSubmit(e: Event): void {
    e.preventDefault();

    const newExpense = {
      expenseName: expenseName,
      category: category,
      amount: amount,
      expenseType: expenseType,
    };

    if (
      expenseName !== "" &&
      category !== "" &&
      amount > 0.0 &&
      expenseType !== ""
    ) {
      addExpense(newExpense, dialogRef);
      clearFormInputs();
    } else {
      alert("failed to add expense");
    }
  }

  return (
    <Dialog dialogRef={dialogRef}>
      <div className="modalContainer expenseFormContainer">
        <h2>Add New Expense</h2>

        <form
          action=""
          className="newExpenseForm flex-col"
          onSubmit={formSubmit}
        >
          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Expense Name</label>
            <input
              type="text"
              onChange={(e) => setExpenseName(e.target.value)}
              ref={expenseNameRef}
            />
          </div>

          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Category</label>

            <select
              name=""
              id=""
              onChange={(e) => setCategory(e.target.value)}
              ref={categoryRef}
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
              onChange={(e) => setAmount(Number(e.target.value))}
              ref={amountRef}
            />
          </div>

          <div className="inputLabelWrap flex-col">
            <label htmlFor="">Type</label>
            <input
              type="text"
              onChange={(e) => setExpenseType(e.target.value)}
              ref={expenseTypeRef}
            />
          </div>

          <div className="btnsContainer">
            <button className="btnMain">Add Expense</button>
            <button type="reset" onClick={() => clearFormInputs()}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddExpenseForm;
