"use client";

import { signIn } from "@/node_modules/next-auth/react";
import { redirect } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaUnlockAlt } from "react-icons/fa";

import { LuOctagonAlert } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";

const SignInForm = () => {
  // UseState
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  /**
   *
   * param: event FormEvent
   *
   * this is the onSubmit handle function that will receive the data from the registration form
   * and call nextauth's signIn. Depending on the outcome, it will:
   *    1. Be successful and redirect to dashboard
   *    2. Have a form error or internal server error
   */
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    // setting up form and isPending
    event.preventDefault();
    setIsPending(true);

    // Receiving data and calling signIn function
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("pwd"),
      redirect: false,
    });

    // Handling possible errors received from signIn
    if (res?.error) {
      if (res.status.toString().startsWith("4"))
        setError("wrong email or password");
      if (res.status.toString().startsWith("5"))
        setError("there was a problem with the server, try again");
    }
    if (res?.ok) {
      redirect("/");
    }

    // After completition, set pending to false
    setIsPending(false);
  };

  return (
    <>
      <form onSubmit={handleSignIn} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex items-center gap-2">
            <MdEmail className="icon" />
            <small>Email:</small>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
            className="w-full"
            onChange={() => setError("")}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex items-center gap-2">
            <FaUnlockAlt className="icon" />
            <small>Password:</small>
          </label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            className="w-full"
            onChange={() => setError("")}
            required
          />
        </div>
        {isPending ? (
          <small className="mx-auto">pending...</small>
        ) : (
          <button className="button mx-auto justify-between w-1/2">
            <small>sign-in</small>
            <RiLoginBoxFill className="icon" />
          </button>
        )}
      </form>
      {error && (
        <div className="flex items-center gap-2 mx-auto border-2 border-onFailure p-2 rounded-md">
          <LuOctagonAlert className="icon text-onFailure" />
          <small className="text-onFailure">{error}</small>
        </div>
      )}
    </>
  );
};

export default SignInForm;
