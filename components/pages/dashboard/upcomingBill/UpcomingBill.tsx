import React from "react";
import Link from "next/link";
import { TransactionStream } from "plaid";

import { MdKeyboardArrowRight } from "react-icons/md";

import detailedCatMap from "@/utils/categoryMap.json" assert { type: "json" };
import { changeDateString } from "@/utils/helperFuncs";
const detailedCatMapTyped = detailedCatMap as Record<string, string>;

interface Props {
  nxtBills: TransactionStream[];
}

const UpcomingBill = ({ nxtBills }: Props) => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 ">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Upcoming Bill
      </h2>

      <div className="flex-1 flex flex-col gap-2 p-2">
        {nxtBills.length > 0 ? (
          nxtBills.splice(0, 4).map((bill) => (
            <div
              key={bill.stream_id}
              className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <p className="lowercase">
                  {detailedCatMapTyped[
                    bill.personal_finance_category?.detailed as string
                  ] || "unknown title"}{" "}
                  - ${bill.average_amount.amount}
                </p>
                <small>due {changeDateString(bill.predicted_next_date)}</small>
              </div>

              <small>last issued on {changeDateString(bill.last_date)}</small>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <p>No pending bills for this month</p>
            <Link
              aria-label="next-month-bills-learn-more-link"
              href={"/calendar"}
              className="group link"
            >
              <small className="link-child">
                want to see next month&apos;s bills{" "}
              </small>
              <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
            </Link>
          </div>
        )}
      </div>
      {nxtBills.length > 4 && (
        <Link
          aria-label="curr-month-bills-learn-more-link"
          href={"#"}
          className="group link mx-auto mt-auto my-2"
        >
          <small className="link-child">show more</small>
          <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        </Link>
      )}
    </div>
  );
};

export default UpcomingBill;
