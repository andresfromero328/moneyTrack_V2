import { AccountBase } from "plaid";
import { client } from "@/lib/plaid";
import { unstable_cache } from "next/cache";
import { OverviewTransaction } from "@/lib/types";

const fetchSpending = async (
  accounts: AccountBase[],
  accessToken: string,
  firstDay: string,
  lastDay: string
) => {
  try {
    // Variables
    const omitCategories = [
      "Transfer",
      "Credit Card",
      "Deposit",
      "Payment",
      "Service",
      "Bank Fees",
    ];

    // function call to request monthly transactions
    const monthlyTranscations = await client.transactionsGet({
      access_token: accessToken,
      start_date: firstDay,
      end_date: lastDay,
      options: {
        account_ids: accounts.map((acc) => acc.account_id),
      },
    });

    let transactions = monthlyTranscations.data.transactions;

    // Getting the rest of monthly transactions
    while (transactions.length < monthlyTranscations.data.total_transactions) {
      const remainingTransactions = await client.transactionsGet({
        access_token: accessToken,
        start_date: firstDay,
        end_date: lastDay,
        options: {
          offset: transactions.length,
          account_ids: accounts.map((acc) => acc.account_id),
        },
      });
      transactions = transactions.concat(
        remainingTransactions.data.transactions
      );
    }
    /* 
      Iterating over transactions to find spending, transactions that don't have certain categories 
      and that are going out the account
      */
    const spending: OverviewTransaction[] = transactions
      .filter((transaction) => {
        const validCategory =
          transaction.category?.some((categ) =>
            omitCategories.includes(categ)
          ) === false && !transaction.name.includes("RECURRING");

        const isOutflow = transaction.amount > 0;

        // Ensure merchant_name exists and all other checks pass
        return (
          validCategory &&
          isOutflow &&
          typeof transaction.merchant_name === "string"
        );
      })
      .map((transaction) => ({
        name: transaction.merchant_name as string, // TypeScript safe now
        amount: transaction.amount,
        date: transaction.date,
      }))
      .reverse();

    return { spending, transactions };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserSpending = unstable_cache(
  async (
    accounts: AccountBase[],
    accessToken: string,
    firstDay: string,
    lastDay: string
  ) => fetchSpending(accounts, accessToken, firstDay, lastDay),
  ["get-user-plaid-access-token"],
  { revalidate: 1800 }
);
