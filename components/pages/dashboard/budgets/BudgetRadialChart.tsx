"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { colorGenerator } from "@/lib/colorGenerator";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetRadialChart = () => {
  const progressValue = 75;

  const data: ChartData<"doughnut"> = {
    labels: ["Already spent", "Left to spend"],
    datasets: [
      {
        data: [progressValue, 100 - progressValue],
        backgroundColor: colorGenerator(2),
        borderColor: ["#4d4637"],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      tooltip: {
        titleFont: {
          size: 14,
          family: "Lexend, sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "Lexend, sans-serif",
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-40 h-40">
      <Doughnut
        id="dashboard-budgets-radial-chart"
        data={data}
        options={options}
        className="z-10"
      />
      <div
        id="budget-info-summary"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold"
      >
        <div className="flex flex-col items-center">
          <p className="font-semibold">Budget:</p>
          <small id="budget-amount" className="text-secondary/75">
            $3500.23
          </small>
        </div>
      </div>
    </div>
  );
};

export default BudgetRadialChart;
