"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

import { BsBank2 } from "react-icons/bs";
import { usePlaidLink } from "react-plaid-link";
import { setAccessToken } from "@/lib/actions/setAccessTokenAction";
import { createLinkToken } from "@/lib/actions/createLinkTokenAction";
import { redirect } from "next/navigation";

interface Props {
  userID: string;
}

const LinkToPlaid = ({ userID }: Props) => {
  // UseState and update from Session
  const [linkToken, setLinkToken] = useState("");
  const [linked, setLinked] = useState(false);
  const { update } = useSession();

  /* 
  UseEffect to generate temporary link token from plaid by calling server action, createLinkToken.
  There should be no dependencies, it is triggered on component mount.
  */
  useEffect(() => {
    // handling calling of server action, createLinkToken, and setting useState linkToken
    const generateToken = async () => {
      const res = await createLinkToken({ userID });
      if (res.linkToken) setLinkToken(res.linkToken);
    };

    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  UseCallback to initiate the creation, by calling setAccessToken, of the permanent access token
  and item id that will be used by plaid to retrieve transactional data from the user's bank account.
  There should be no dependencies, it is triggered when ready, from usePlaidLink, is true.
  */
  const onSuccess = useCallback(
    async (public_token: string) => {
      try {
        await setAccessToken({ userID, public_token });
        setLinked(!linked);
      } catch (e) {
        console.log("LinkToPlaid error_line-35", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* 
  UseEffect that will update the session to plaidLinked to true and redirect authorized user to /.
  The useEffect should be triggered when linked is set to true. This is done inside onSuccess
  */
  useEffect(() => {
    (async () => {
      await update();
      redirect("/");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linked]);

  // usePlaidLink configuartion
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => ready && open()} className="button mx-auto mt-10">
      <BsBank2 />
      <small>link bank</small>
    </button>
  );
};

export default LinkToPlaid;
