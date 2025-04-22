"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BillsBarChart = () => {
  const data: ChartData<"bar"> = {
    labels: ["cat 1", "cat 2", "cat 3", "cat 4", "cat 5", "cat 6"],
    datasets: [
      {
        label: "prev month",
        data: [500, 700, 400, 800, 600, 900],
        backgroundColor: "#ffd32c",
        borderColor: "#4d4637",
        borderWidth: 2.5,
        borderRadius: 6,
      },
      {
        label: "current month",
        data: [600, 450, 120, 780, 250, 600],
        backgroundColor: "#8a9a74",
        borderColor: "#4d4637",
        borderWidth: 2.5,
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
        border: {
          display: true,
          width: 2,
          color: "#4d4637",
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
        border: {
          display: true,
          width: 2,
          color: "#4d4637",
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
      <h3 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Bills Trend</h3>
      <div className="flex-1 w-full mx-auto h-52 p-5">
        <Bar
          id="calendar-bills-trend-bar-chart"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default BillsBarChart;
