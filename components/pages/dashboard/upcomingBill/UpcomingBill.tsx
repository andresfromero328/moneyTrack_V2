import React from "react";
import Link from "next/link";
import { TransactionStream } from "plaid";

import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  nxtBills: TransactionStream[];
}

const UpcomingBill = ({ nxtBills }: Props) => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 ">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Upcoming Bill
      </h2>

      <div className="flex flex-col gap-2 p-2">
        {nxtBills.splice(0, 4).map((bill) => (
          <div
            key={bill.stream_id}
            className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <p>
                {bill.personal_finance_category?.detailed || "unknown title"}
              </p>
              <p>${bill.average_amount.amount}</p>
            </div>

            <small>last issued on {bill.last_date}</small>
          </div>
        ))}
      </div>
      {nxtBills.length > 4 && (
        <Link
          aria-label="[specific bill id]-bill-learn-more-link"
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
