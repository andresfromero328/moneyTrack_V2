"use client";

import React from "react";

import { FaHospital, FaPlus, FaTheaterMasks } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

import BudgetRadialChart from "./BudgetRadialChart";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const Budgets = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 ">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Budgets</h2>

      <div className="flex flex-col gap-5 p-2">
        <div className="flex flex-wrap gap-5 items-center mx-auto">
          <BudgetRadialChart />

          <div className="flex flex-col gap-2">
            <p className="font-semibold">Left for Spending:</p>
            <small>$455.65</small>
            <small>
              on <span className="text-secondary/65">Category</span>
            </small>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mx-auto">
          <button
            aria-label="all-budgets-dashboard-view"
            className="button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full"
          >
            <small>All</small>
          </button>
          <button
            aria-label="all-[budget 1]-dashboard-view"
            className="button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full"
          >
            <FaHospital className="icon" />
          </button>
          <button
            aria-label="all-[budget 2]-dashboard-view"
            className="button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full"
          >
            <FaTheaterMasks className="icon" />
          </button>
          <button
            aria-label="all-[budget 3]-dashboard-view"
            className="button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full"
          >
            <IoFastFood className="icon" />
          </button>
          <button
            aria-label="all-[budget 4]-dashboard-view"
            className="button min-w-9 min-h-9 md:min-w-11 md:min-h-11 rounded-full"
          >
            <FaPlus className="icon" />
          </button>
        </div>
      </div>
      <Link
        aria-label="budgets-dashboard-learn-more-link"
        href={"#"}
        className="group link mx-auto my-2"
      >
        <small className="link-child">learn more</small>
        <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </Link>
    </div>
  );
};

export default Budgets;
