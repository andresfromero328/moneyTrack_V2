"use server";

import { connectDB } from "@/lib/mongodb";
import { client } from "@/lib/plaid";
import { User } from "@/models/User";

interface Request {
  userID: string;
  public_token: string;
}

/**
 *
 * param: values Request
 *
 * This action server receives the signed-in user's id and public token to create a permanent
 * access token and plaid item ID to be able to retrieve transactional information from the
 * user's bank account
 *
 * return: {code: boolean, message: string} | mongoDB error
 */

export const setAccessToken = async ({ userID, public_token }: Request) => {
  try {
    await connectDB();
    const res = await client.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = res.data.access_token;
    const itemID = res.data.item_id;
    await User.findByIdAndUpdate(
      userID,
      {
        plaidAccessToken: accessToken,
        plaidItemID: itemID,
        plaidLinked: true,
      },
      { new: true }
    ).select("+plaidAccessToken");

    return { code: true, message: "success" };
  } catch (e) {
    console.log("Action error (setAccToken)_line-27", e);
    return {
      code: false,
      message: "there was an error, please try again",
    };
  }
};
