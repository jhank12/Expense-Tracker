import React, { useContext } from "react";

import { ExpensesContext } from "../../Context/ExpensesContext";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PieChartComponent = () => {
  const { expenses } = useContext(ExpensesContext);

  // const categoryColors = {
  //   food: "rgba(0,0,0,1)",
  //   subscription: "rgba(1,100,11,1)",
  //   bill: "rgba(42,3,2,1)",
  //   misc: "rgba(3,30,3,1)",
  // };

  const categoryColors = {
    food: "#ff0000",
    subscription: "#0000ff",
    bill: "#008000",
    misc: "#fa8072",
  };

  // const expenseCategories = getExpenseCategories().categories;
  // const expenseColors = getExpenseCategories().colors;
  // const expenseSums = getExpenseSums();

  // one object per category
  // {category, amount: expenseSums()}
  const chartData = getChartData();

  function getChartData() {
    const expenseCategoriesArr: [string] = [];

    expenses.forEach((expense) => {
      const { category, amount, expenseType } = expense;

      if (
        expenseCategoriesArr.indexOf(category) < 0 &&
        expenseType === "deduct"
      ) {
        expenseCategoriesArr.push(category);
      }
    });

    const categoryObjs = [];

    expenseCategoriesArr.forEach((category) => {
      let categorySum: number = 0;

      expenses.filter((expense) => {
        const { category: expenseCategory, amount } = expense;

        // chain with reduce ()
        if (expenseCategory === category) categorySum += amount;
      });

      const categoryObj = { category: category, amount: categorySum };

      categoryObjs.push(categoryObj);
      console.log(category, categorySum);
    });

    return categoryObjs;
  }

  // const testData = [
  //   { category: "Food", amount: 20, color: "#fa8072" },
  //   {
  //     category: "Subscription",
  //     amount: 19.99,
  //     color: "#fa8072",
  //   },
  //   { category: "Misc", amount: 100, color: "#fa8072" },
  // ];

  return (
    <div>
      <PieChart width={730} height={450}>
        <Pie
          data={chartData}
          nameKey="category"
          dataKey="amount"
          fill="color"
          cx="50%"
          cy="50%"
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
