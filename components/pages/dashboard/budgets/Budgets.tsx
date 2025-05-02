"use client";

import React, { useState } from "react";

import BudgetRadialChart from "./BudgetRadialChart";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BudgetDocument, BudgetTransaction } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import CreateBudgetModal from "@/components/global/modals/CreateBudgetModal";
import BudgetSelection from "./BudgetSelection";

interface Props {
  budgetTransactions: BudgetTransaction[];
  budgets: BudgetDocument[];
  userID: string;
}

const Budgets = ({ budgetTransactions, budgets, userID }: Props) => {
  const [open, setOpen] = useState(false);
  const [currBudget, setCurrBudget] = useState("all");
  const [budgetTotal, setBudgetTotal] = useState<number>(0);

  const handleDefaultBudget = () => {
    const totalAmount = budgets.reduce((sum, b) => {
      return sum + Number(b.budgetAmount || 0);
    }, 0);
    const mCategories = budgets.map((b) => b.mCategory.toUpperCase());
    const sCategories = budgets.map((b) => b.sCategory.toUpperCase());
    const transactions = budgetTransactions.filter((transaction) => {
      if (
        mCategories.includes(transaction.mCategory) ||
        sCategories.includes(transaction.sCategory)
      )
        return transaction;
      return null;
    });
    const spent = transactions.reduce((sum, b) => {
      return sum + Number(b.amount || 0);
    }, 0);
    setBudgetTotal(totalAmount);
    return spent / totalAmount;
  };

  const handleCurrBudget = (budget: string) => {
    setCurrBudget(budget);

    if (budget === "all") {
      const budgetProgress = handleDefaultBudget();
      setBudgetProgress(budgetProgress * 100);
    } else {
      const currBudget = budgets.find((bgt) => bgt.budgetName === budget);
      const totalAmount = currBudget!.budgetAmount;

      const transactions = budgetTransactions.filter((transaction) => {
        if (
          currBudget?.mCategory.toUpperCase() === transaction.mCategory ||
          currBudget?.sCategory.toUpperCase() === transaction.sCategory
        )
          return transaction;
        return null;
      });
      const spent = transactions.reduce((sum, b) => {
        return sum + Number(b.amount || 0);
      }, 0);
      setBudgetProgress((spent / totalAmount) * 100);
      setBudgetTotal(totalAmount);
    }
  };

  const [budgetProgress, setBudgetProgress] = useState(() =>
    handleDefaultBudget()
  );

  return (
    <>
      <div className="rounded-md shadow-sm flex flex-col gap-2 ">
        <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Budgets</h2>

        <div className="flex-1 flex flex-col gap-5 p-2">
          {budgets.length > 0 && (
            <div className="flex flex-wrap gap-5 items-center mx-auto">
              <BudgetRadialChart
                progress={budgetProgress}
                budgetTotal={budgetTotal}
              />

              <div className="flex flex-col gap-1">
                <p className="font-bold text-secondary">Left for Spending:</p>
                <small>
                  $
                  {(budgetTotal - (budgetProgress / 100) * budgetTotal).toFixed(
                    2
                  )}
                </small>
                <small>
                  on{" "}
                  <span className="text-secondary/65 uppercase">
                    {currBudget}
                  </span>
                </small>
              </div>
            </div>
          )}

          <BudgetSelection
            budgets={budgets}
            currBudget={currBudget}
            setOpen={setOpen}
            handleCurrBudget={handleCurrBudget}
          />
        </div>

        {budgets.length > 0 && (
          <Link
            aria-label="budgets-dashboard-learn-more-link"
            href={"/reports"}
            className="group link mx-auto my-2"
          >
            <small className="link-child">learn more</small>
            <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          </Link>
        )}
      </div>

      <AnimatePresence mode="wait">
        {open && <CreateBudgetModal userID={userID} setOpen={setOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Budgets;
