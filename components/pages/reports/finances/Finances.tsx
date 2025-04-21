import React from "react";

import FinancesBarChart from "./FinancesBarChart";
import FinancesTable from "./FinancesTable";

const Finances = () => {
  return (
    <div className="col-span-2 rounded-md shadow-sm flex flex-col gap-2">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Finances</h2>
      <FinancesBarChart />
      <FinancesTable />
    </div>
  );
};

export default Finances;
