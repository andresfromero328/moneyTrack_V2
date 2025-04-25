import { User } from "@/models/User";
import { connectDB } from "../../mongodb";
import { unstable_cache } from "next/cache";

const fetchPlaidAccessToken = async (userID: string) => {
  try {
    await connectDB();
    const userPlaidAccessToken = await User.findOne({ _id: userID }).select(
      "plaidAccessToken"
    );

    if (!userPlaidAccessToken)
      throw new Error("user does not have a plaid token");
    return userPlaidAccessToken.plaidAccessToken;
  } catch (e) {
    throw e;
  }
};

export const getPlaidAccessToken = unstable_cache(
  async (userID: string) => fetchPlaidAccessToken(userID),
  ["get-user-plaid-access-token"],
  { revalidate: 1800 }
);
