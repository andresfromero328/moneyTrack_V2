import { client } from "@/lib/plaid";
import { unstable_cache } from "next/cache";

const fetchAccounts = async (plaidAccToken: string) => {
  try {
    // Variables
    const response = await client.accountsBalanceGet({
      access_token: plaidAccToken,
    });

    return response.data.accounts;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserAccounts = unstable_cache(
  async (plaidAccToken: string) => fetchAccounts(plaidAccToken),
  ["get-user-accounts"],
  { revalidate: 900 }
);
