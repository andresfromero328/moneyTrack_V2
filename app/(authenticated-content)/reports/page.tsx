import React from "react";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import Finances from "@/components/pages/reports/finances/Finances";
import Spending from "@/components/pages/reports/spending/Spending";
import Budgets from "@/components/pages/reports/budget/Budgets";

const ReportsPage = () => {
  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full max-w-7xl mx-auto flex flex-col gap-5 p-5"
    >
      <h1>Reports</h1>

      <Finances />
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 gap-5">
        <Spending />
        <Budgets />
      </div>
    </StaggerAnimWrapper>
  );
};

export default ReportsPage;
