import React from "react";

const PendBillsRadialChart = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 min-h-52">
      <h3 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Pending Bills
      </h3>
      <small className="flex-1 grid place-items-center">[radial chart]</small>
    </div>
  );
};

export default PendBillsRadialChart;
