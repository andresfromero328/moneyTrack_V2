'use client'

import React from "react";

const SpendingAreaChart = () => {
  return (
    <div className="col-span-2 rounded-md shadow-sm flex flex-col gap-2 min-h-[336px]">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Monthly Spending
      </h2>
      <small className="flex-1 grid place-items-center">[area chart]</small>
    </div>
  );
};

export default SpendingAreaChart;
