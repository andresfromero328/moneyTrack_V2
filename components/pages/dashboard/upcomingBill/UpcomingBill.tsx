import React from "react";
import Link from "next/link";

import { MdKeyboardArrowRight } from "react-icons/md";

const UpcomingBill = () => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2 ">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Upcoming Bill
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 m-2">
        <div className="flex gap-2 items-center">
          <h3>$48.99</h3>
          <small>on Service</small>
        </div>
        <small>This bill was last issued on 18 of Jan, 2025</small>
      </div>
      <Link
        aria-label="[specific bill id]-bill-learn-more-link"
        href={"#"}
        className="group link mx-auto my-2"
      >
        <small className="link-child">learn more</small>
        <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </Link>
    </div>
  );
};

export default UpcomingBill;
