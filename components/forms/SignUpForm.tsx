"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

import { register } from "@/lib/actions/registerAction";
import { FaUnlockAlt } from "react-icons/fa";
import { RiUserAddFill, RiUserFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { LuOctagonAlert } from "react-icons/lu";

export const SignUpForm = () => {
  // UseState
  const [error, setError] = useState("");

  /**
   *
   * param: formData FormData
   *
   * This is the action of the sign-up form. It will register a user to the database.
   *
   * return: null | redirect to sign-in page
   */
  const handleSubmit = async (formData: FormData) => {
    // calling server action, register, to save new user in the database
    const r = await register({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    // Handling error or successful return. Error-display error, Success: redirect user to sign-in page
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return redirect("/sign-in");
    }
  };

  return (
    <>
      <form action={handleSubmit} className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-2 ">
          <label htmlFor="name" className="flex items-center gap-2">
            <RiUserFill className="icon" />
            <small>name:</small>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            onChange={() => setError("")}
            className="w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex items-center gap-2">
            <MdEmail className="icon" />
            <small>Email:</small>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            onChange={() => setError("")}
            className="w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex items-center gap-2">
            <FaUnlockAlt className="icon" />
            <small>Password:</small>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            className="w-full"
            required
            onChange={() => setError("")}
          />
        </div>

        <button
          type="submit"
          className="justify-between w-1/2 mx-auto disabled:opacity-50 button"
        >
          <small>sign up</small>
          <RiUserAddFill className="icon" />
        </button>
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
