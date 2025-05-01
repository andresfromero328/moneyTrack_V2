import { BudgetDocument } from "@/lib/types";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface Props {
  budgets: BudgetDocument[];
  currBudget: string;
  setOpen: (open: boolean) => void;
  handleCurrBudget: (budget: string) => void
}

const BudgetSelection = ({ budgets, currBudget, setOpen, handleCurrBudget }: Props) => {
  
  return (
    <div
      className={`${
        budgets.length === 0 && "flex-1"
      } flex flex-wrap items-center gap-2 mx-auto`}
    >
      {budgets.length > 0 && (
        <>
          <button
            aria-label="all-budgets-dashboard-view"
            className={`button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full ${
              currBudget === "all" && "bg-accent/50 border-secondary"
            }`}
            onClick={() => handleCurrBudget("all")}
          >
            <small>All</small>
          </button>

          {budgets.map((budget) => (
            <button
              key={budget.budgetName}
              aria-label={`all-${budget.budgetName}-dashboard-view`}
              className={`button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full ${
                currBudget === budget.budgetName &&
                "bg-accent/50 border-secondary"
              }`}
              onClick={() => handleCurrBudget(budget.budgetName)}
            >
              <small className="uppercase">{budget.budgetName[0]}</small>
            </button>
          ))}
        </>
      )}

      <button
        aria-label="create-budget-dashboard-view"
        className={`button ${
          budgets.length === 0
            ? "w-25 h-25"
            : "min-w-9 min-h-9 md:min-w-11 md:min-h-11"
        } rounded-full`}
        onClick={() => setOpen(true)}
      >
        <FaPlus className="icon" />
      </button>
    </div>
  );
};

export default BudgetSelection;
