import { client } from "@/lib/plaid";
import { unstable_cache } from "next/cache";
import { AccountBase } from "plaid";

const fetchRecurrTransactions = async (
  accounts: AccountBase[] | null,
  plaidAccToken: string
) => {
  try {
    if (!accounts) throw new Error("there are no accounts");

    const recurTransactions = await client.transactionsRecurringGet({
      access_token: plaidAccToken,
      account_ids: accounts.map((acc) => acc.account_id),
    });

    return recurTransactions.data.outflow_streams;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getRecurrTransactions = unstable_cache(
  async (accounts: AccountBase[] | null, plaidAccToken: string) =>
    fetchRecurrTransactions(accounts, plaidAccToken),
  ["get-user-recurr-transactions"],
  { revalidate: 900 }
);
