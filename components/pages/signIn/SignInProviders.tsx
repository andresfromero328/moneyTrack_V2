"use client";

import React from "react";
import { signIn } from "@/node_modules/next-auth/react";

import { FaApple, FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";

const SignInProviders = () => {
  return (
    <div className="relative flex flex-col items-center gap-5">
      <small>or sign-in using</small>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            signIn("google", {
              redirect: true,
              callbackUrl: "/",
            });
          }}
          className="group button bg-transparent hover:bg-primary"
        >
          <FaGoogle className="icon group-hover:text-special default-animation" />
        </button>
        <button className="group button bg-transparent hover:bg-primary">
          <FaFacebookF className="icon group-hover:text-special default-animation" />
        </button>
        <button className="group button bg-transparent hover:bg-primary">
          <FaApple className="icon group-hover:text-special default-animation" />
        </button>
        <button className="group button bg-transparent hover:bg-primary">
          <FaInstagram className="icon group-hover:text-special default-animation" />
        </button>
      </div>
    </div>
  );
};

export default SignInProviders;
