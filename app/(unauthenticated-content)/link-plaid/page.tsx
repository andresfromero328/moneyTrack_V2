import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { CustomSession } from "@/lib/types";

import LinkToPlaid from "@/components/pages/linkPlaid/LinkToPlaid";
import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";

const LinkPlaidPage = async () => {
  // calling session to retrieve the user's ID
  const user: CustomSession | null = await getServerSession(authOptions);

  return (
    <StaggerAnimWrapper
      tag="main"
      style="w-full min-h-screen max-w-7xl mx-auto grid place-items-center gap-5 p-5"
    >

      <div className="flex flex-col gap-5 min-w-[320px] p-5 shadow-md rounded-md">
        <div className="flex gap-5 items-center justify-between">
          <Image
            src={"/logo.svg"}
            width={75}
            height={75}
            priority
            alt="Logo"
            className="drop-shadow-md"
            style={{ width: "75px", height: "75px" }}
            />
          <h1>Link your Bank</h1>
        </div>
        <LinkToPlaid userID={user!.userID} />
      </div>
      </StaggerAnimWrapper>
  );
};

export default LinkPlaidPage;
