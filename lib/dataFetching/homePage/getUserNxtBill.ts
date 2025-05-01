import { unstable_cache } from "next/cache";
import { AccountBase } from "plaid";
import { getRecurrTransactions } from "./helpers/getRecurringTransactions";
import { BILLS_DTLD_CATS, BILLS_PRIM_CATS } from "@/utils/categories";

const fetchUserNxtBill = async (
  accounts: AccountBase[] | null,
  plaidAccToken: string,
  todayDate: number
) => {
  try {
    if (!accounts) throw new Error("there are no accounts");

    const recurrTransactions = await getRecurrTransactions(
      accounts,
      plaidAccToken
    );

    const billsRecurrTransactions = recurrTransactions.filter((transaction) => {
      if (
        (BILLS_PRIM_CATS.includes(
          transaction.personal_finance_category!.primary
        ) ||
          BILLS_DTLD_CATS.includes(
            transaction.personal_finance_category!.detailed
          )) &&
        new Date(transaction.predicted_next_date!).getMonth() === todayDate
      )
        return transaction;
      return null;
    });

    return billsRecurrTransactions;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserNxtBill = unstable_cache(
  async (
    accounts: AccountBase[] | null,
    plaidAccToken: string,
    todayDate: number
  ) => fetchUserNxtBill(accounts, plaidAccToken, todayDate),
  ["get-user-next-bill"],
  { revalidate: 900, tags: ["get-user-next-bill"] }
);
