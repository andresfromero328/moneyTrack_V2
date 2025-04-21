import React from "react";

const AccountListing = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate">
            Account Name - <small>account mask</small>{" "}
          </p>

          <p>$1000.35</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-between gap-1">
          <p className="truncate">
            Account Name - <small>account mask</small>{" "}
          </p>

          <p>$2500.00</p>
        </div>
        <small>Total credit available - $5000.00</small>
        <small className="ml-auto">$2500.00 available</small>
        <div className="w-full h-4 flex items-center rounded-full bg-secondary/85 p-1">
          <div className="w-1/2 h-2 rounded-full bg-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountListing;
