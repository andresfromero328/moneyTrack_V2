import Image from "next/image";
import Link from "next/link";

import { SignUpForm } from "@/components/forms/SignUpForm";
import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import { RiLoginBoxFill } from "react-icons/ri";

const SignupPage = () => {
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
          <h1 className="font-bold">Welcome!</h1>
        </div>

        <SignUpForm />
        <hr className="border-[1px] border-secondary/50" />
        <div className="flex items-center gap-2 mx-auto">
          <small>already have an account</small>
          <Link href={"/sign-in"}>
            <button className="button">
              <small>sign in</small>
              <RiLoginBoxFill className="icon" />
            </button>
          </Link>
        </div>
      </div>
    </StaggerAnimWrapper>
  );
};

export default SignupPage;
