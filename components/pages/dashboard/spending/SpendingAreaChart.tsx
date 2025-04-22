"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpendingAreaChart = () => {
  const data: ChartData<"line"> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [300, 400, 500, 700, 600, 800],
        backgroundColor: "rgba(255, 211, 44, .45)",
        borderColor: "rgba(77, 70, 55, 1)",
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
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
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#272727",
          font: {
            size: 14,
            family: "Lexend, sans-serif",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#272727",
          font: {
            size: 14,
            family: "Lexend, sans-serif",
          },
        },
      },
    },
  };
  return (
    <div className="col-span-2 rounded-md shadow-sm flex flex-col gap-2 min-h-[336px]">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Monthly Spending
      </h2>

      <div className="w-full h-60 p-2">
        <Line
          id="-dashboard-spending-line-chart"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default SpendingAreaChart;
