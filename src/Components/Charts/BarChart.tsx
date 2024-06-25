import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
ChartJS.register(CategoryScale);
import { Bar, Pie } from "react-chartjs-2";

const BarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "",
              data: [10, 20, 30, 40, 50, 60, 70],
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
