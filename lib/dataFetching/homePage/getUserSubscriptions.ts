import { Subscription } from "@/lib/types";
import { unstable_cache } from "next/cache";
import { AccountBase } from "plaid";
import { getRecurrTransactions } from "./helpers/getRecurringTransactions";

const fetchSubscriptions = async (
  accounts: AccountBase[] | null,
  plaidAccToken: string
) => {
  try {
    if (!accounts) throw new Error("there are no accounts");

    const recurTransactions = await getRecurrTransactions(
      accounts,
      plaidAccToken
    );
    const subscriptionList: Subscription[] = [];
    recurTransactions.forEach((transaction) => {
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
