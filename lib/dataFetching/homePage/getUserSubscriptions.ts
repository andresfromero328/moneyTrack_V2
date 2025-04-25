import { client } from "@/lib/plaid";
import { Subscription } from "@/lib/types";
import { unstable_cache } from "next/cache";
import { AccountBase } from "plaid";

const fetchSubscriptions = async (
  accounts: AccountBase[] | null,
  plaidAccToken: string
) => {
  try {
    if (!accounts) throw new Error("there are no accounts");

    const recurTransactions = await client.transactionsRecurringGet({
      access_token: plaidAccToken,
      account_ids: accounts.map((acc) => acc.account_id),
    });

    const subscriptionList: Subscription[] = [];
    const outflowStreams = recurTransactions.data.outflow_streams;
    outflowStreams.forEach((transaction) => {
      if (transaction.category.includes("Subscription"))
        subscriptionList.push({
          name: transaction.merchant_name!,
          firstDate: transaction.first_date,
          amount: transaction.average_amount.amount!,
          id: transaction.stream_id,
        });
    });

    return subscriptionList;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserSubscriptions = unstable_cache(
  async (accounts: AccountBase[] | null, plaidAccToken: string) =>
    fetchSubscriptions(accounts, plaidAccToken),
  ["get-user-subscriptions"],
  { revalidate: 900 }
);
