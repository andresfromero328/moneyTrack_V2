import { AccountBase } from "plaid";
import { client } from "@/lib/plaid";
import { unstable_cache } from "next/cache";
import { OverviewTransaction } from "@/lib/types";
import {
  OMIT_DTLD_CATS_SPENDING,
  OMIT_PRIM_CATS_SPENDING,
} from "@/utils/categories";

const fetchSpending = async (
  accounts: AccountBase[],
  accessToken: string,
  firstDay: string,
  lastDay: string
) => {
  try {
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
          !OMIT_PRIM_CATS_SPENDING.includes(
            transaction.personal_finance_category!.primary
          ) ||
          !OMIT_DTLD_CATS_SPENDING.includes(
            transaction.personal_finance_category!.detailed
          );

        // const isOutflow = transaction.amount > 0;

        return (
          validCategory &&
          // isOutflow &&
          typeof transaction.merchant_name === "string"
        );
      })
      .map((transaction) => ({
        name: transaction.merchant_name || transaction.name,
        amount: Math.abs(transaction.amount),
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
  ["get-user-spending"],
  { revalidate: 1800 }
);
