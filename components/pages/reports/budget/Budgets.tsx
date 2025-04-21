import React from "react";
import BudgetDonutChart from "./BudgetDonutChart";
import BudgetBrkdTable from "./BudgetBrkdTable";

const Budgets = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Budgets</h2>
      <BudgetDonutChart />
      <BudgetBrkdTable />
    </div>
  );
};

export default Budgets;
