import React from "react";

const BillsBarChart = () => {
  return (
    <div className="col-span-2 rounded-md shadow-sm flex flex-col gap-2 min-h-[336px]">
      <h3 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Bills Trend</h3>
      <small className="flex-1 grid place-items-center">[bar chart]</small>
    </div>
  );
};

export default BillsBarChart;
