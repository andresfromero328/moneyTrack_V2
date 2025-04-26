import { AccountBase } from "plaid";
import React from "react";

interface Props {
  accounts: AccountBase[] | null;
}

const AccountListing = ({ accounts }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {accounts &&
        accounts.slice(0, 5).map((account) => (
          <div
            key={account.account_id}
            className="flex flex-col gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out"
          >
            <div className="w-full flex items-center justify-between gap-1">
              <p className="truncate">
                {account.name} - <small>{account.mask}</small>{" "}
              </p>

              <p>${account.balances.current}</p>
            </div>

            {account.type === "credit" && (
              <>
                <small>
                  Total credit available - ${account.balances.limit}
                </small>
                <small className="ml-auto">
                  ${account.balances.available} available
                </small>
                <div className="w-full h-4 flex items-center rounded-full bg-secondary/85 p-1">
                  <div className="w-1/2 h-2 rounded-full bg-accent"></div>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default AccountListing;
