import React from "react";
import Link from "next/link";
import { AccountBase } from "plaid";

import { MdKeyboardArrowRight } from "react-icons/md";

import AccountListing from "./AccountListing";

interface Props {
  accounts: AccountBase[] | null;
}

const Accounts = ({ accounts }: Props) => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-2">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">Accounts</h2>

      <AccountListing accounts={accounts} />

      {accounts && accounts.length > 5 && (
        <Link
          aria-label="accounts-dashboard-view-all-link"
          href={"#"}
          className="group link mx-auto mt-auto my-2"
        >
          <small className="link-child">view all</small>
          <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        </Link>
      )}
    </div>
  );
};

export default Accounts;
