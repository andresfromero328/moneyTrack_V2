import Link from "next/link";
import React from "react";
import { RiUserAddFill } from "react-icons/ri";

const RegisterLink = () => {
  return (
    <div className="flex items-center gap-2 mx-auto">
      <small>or create an account</small>
      <Link href={"/sign-up"}>
        <button className="button">
          <RiUserAddFill className="icon" />
          <small>sign up</small>
        </button>
      </Link>
    </div>
  );
};

export default RegisterLink;
