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
  TooltipItem,
} from "chart.js";
import { OverviewTransaction } from "@/lib/types";

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

interface Props {
  spending: OverviewTransaction[] | null;
}

const SpendingAreaChart = ({ spending }: Props) => {
  // Creates labels for the area chart
  const labels = (spending: OverviewTransaction[]) => {
    const setLabels: string[] = [];
    spending.forEach((item) => {
      setLabels.push(item.date);
    });
    return setLabels;
  };

  // Creates data points for the area chart
  const dataPoints = (spending: OverviewTransaction[]) => {
    const setDataPoints: number[] = [];
    spending.forEach((item) => {
      setDataPoints.push(item.amount);
    });
    return setDataPoints;
  };

  const data: ChartData<"line"> = {
    labels: labels(spending!),
    datasets: [
      {
        data: dataPoints(spending!),
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
        callbacks: {
          label: (ctx: TooltipItem<"line">) => {
            const label = ctx.raw;
            return [`${spending![ctx.dataIndex].name}: `, `$${label}`];
          },
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
          callback: (value: number | string) => "$" + value,
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

      <div className="flex-1 w-full h-60 p-5">
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
