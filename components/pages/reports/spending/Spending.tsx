import React from "react";

import SpendingDonutChart from "./SpendingDonutChart";
import SpendingBrkdTable from "./SpendingBrkdTable";

const Spending = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Spending</h2>

      <SpendingDonutChart />
      <SpendingBrkdTable />
    </div>
  );
};

export default Spending;
