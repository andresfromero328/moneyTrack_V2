import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const FinancesTable = () => {
  return (
    <div className="w-full md:w-[75%] mx-auto flex flex-col gap-2 p-2">
      <h3>Finances Breakdown:</h3>
      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate flex-1">Earnings:</p>

          <p>$1000.35</p>
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
          <p className="truncate flex-1">Bills:</p>

          <p>$450.45</p>
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
          <p className="truncate flex-1">Spending</p>

          <p>$320.50</p>
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

export default FinancesTable;
