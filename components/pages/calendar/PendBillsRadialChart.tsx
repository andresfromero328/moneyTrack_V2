"use client";

import React from "react";
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

const PendBillsRadialChart = () => {
  const progressValue = 75;

  const data: ChartData<"doughnut"> = {
    labels: ["Bills paid", "Pending bills"],
    datasets: [
      {
        data: [progressValue, 100 - progressValue],
        backgroundColor: colorGenerator(2),
        borderColor: ["#48584a"],
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
          family: "Funnel Sans, sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "Funnel Sans, sans-serif",
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 min-h-52">
      <h3 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Pending Bills
      </h3>

      <div className="flex-1 flex items-center gap-5 mx-auto p-2">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <Doughnut
            id="calendar-pending-bills-radial-chart"
            data={data}
            options={options}
            className="z-10"
          />
          <div className="absolute">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Total Bills:</p>
              <small id="total-bills-amount" className="text-secondary/75">
                $3500.23
              </small>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p id="pending-bills-title" className="font-bold text-secondary">
            Pending Bills:
          </p>
          <p
            id="pending-bills-amount"
            className="font-semibold text-secondary/75"
          >
            $2,453.23
          </p>
          <small id="text-bills-month-radial">
            on <span className="text-special">April 22, 2025</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default PendBillsRadialChart;
