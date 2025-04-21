import React from "react";

const BudgetRadialChart = () => {
  return (
    <div className="relative w-40 h-40 rounded-full border-8 border-secondary">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <small>Budget:</small>
        <small>$1450.55</small>
      </div>
    </div>
  );
};

export default BudgetRadialChart;
