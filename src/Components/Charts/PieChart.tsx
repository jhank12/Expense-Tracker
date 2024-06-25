import React, { useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
ChartJS.register(CategoryScale);
import { Bar, Pie } from "react-chartjs-2";

import { ExpensesContext } from "../../Context/ExpensesContext";

const PieChart = () => {
  const { expenses } = useContext(ExpensesContext);

  const expenseCategories = getExpenseCategories();
  const expenseSums = getExpenseSums();

  function getExpenseCategories(): [string] {
    const expenseCategories: [string] = [];

    expenses.forEach((expense) => {
      const { category, expenseType } = expense;

      if (expenseCategories.indexOf(category) < 0 && expenseType !== "add") {
        expenseCategories.push(expense.category);
      } else {
        return;
      }
    });

    return expenseCategories;
  }

  function getExpenseSums(): [number] {
    const expenseSumsArr: [number] = [];

    expenseCategories.forEach((category) => {
      let categorySum: number = 0;

      expenses.filter((expense) => {
        const { category: expenseCategory, amount, expenseType } = expense;

        if (expenseType !== "add" && expenseCategory === category) {
          categorySum += amount;
        }
      });

      expenseSumsArr.push(categorySum);
    });
    console.log(expenseSumsArr);
    return expenseSumsArr;
  }

  return (
    <div>
      {expenseSums}
      <Pie
        data={{
          labels: expenseCategories,
          datasets: [
            {
              label: "",
              data: expenseSums,
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
