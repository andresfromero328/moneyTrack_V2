"use server";

import { client } from "@/lib/plaid";
import { CountryCode, Products } from "plaid";

interface Request {
  userID: string;
}

/**
 *
 * param: userID string
 * 
 * This server action receives the signed-in user's id and creates a temporary link to initiate
 * plaid's flow of creating a connection between the user's bank and plaid services
 * 
 * return: {linkToken: string, message: string}
 */

export const createLinkToken = async ({ userID }: Request) => {
  try {
    const createTokenResponse = await client.linkTokenCreate({
      user: {
        client_user_id: userID,
      },
      client_name: "moneytrack",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });
    return {
      linkToken: createTokenResponse.data.link_token,
      message: "success",
    };
  } catch (e) {
    console.log("Action error (createLinkToken)_line-27", e);
    return {
      linkToken: null,
      message: "there was an error, please try again",
    };
  }
};
