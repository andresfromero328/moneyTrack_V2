import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const BudgetBrkdTable = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-2 p-2">
      <h3>Spending Breakdown:</h3>
      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate flex-1">Food & Drinks:</p>

          <p>$300</p>
          <Link
            aria-label="finances-earnings-learn-more-link"
            href={"#"}
            className="group link  my-2"
          >
            <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate flex-1">Recreation:</p>

          <p>$100</p>
          <Link
            aria-label="finances-bills-learn-more-link"
            href={"#"}
            className="group link  my-2"
          >
            <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate flex-1">Technology</p>

          <p>$200</p>
          <Link
            aria-label="finances-spending-learn-more-link"
            href={"#"}
            className="group link  my-2"
          >
            <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BudgetBrkdTable;
