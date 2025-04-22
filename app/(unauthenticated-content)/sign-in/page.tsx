import React from "react";
import Image from "next/image";

import RegisterLink from "@/components/pages/signIn/RegisterLink";
import SignInProviders from "@/components/pages/signIn/SignInProviders";
import SignInForm from "@/components/forms/SignInForm";
import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";

const SignInpage = () => {
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
          <h1 className="font-bold">Sign in</h1>
        </div>
        <SignInForm />
        <hr className="border-[1px] border-secondary/50" />
        <SignInProviders />
        <RegisterLink />
      </div>
    </StaggerAnimWrapper>
  );
};

export default SignInpage;
