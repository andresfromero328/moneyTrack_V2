import React from "react";
import Link from "next/link";

import { Subscription } from "@/lib/types";

import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  subscriptions: Subscription[] | null;
}

const Subscriptions = ({ subscriptions }: Props) => {
  return (
    <div className="rounded-md shadow-sm flex flex-col gap-1 ">
      <h2 className="bg-accent/30 p-2 rounded-tl-md shadow-sm">
        Subscriptions
      </h2>

      <div className="flex-1 flex flex-col gap-2 p-2 ">
        <div
          className={`w-25 h-25 mx-auto grid place-items-center rounded-full border-8 border-secondary ${
            subscriptions!.length === 0 && "my-auto"
          }`}
        >
          <h2>{subscriptions ? subscriptions.length : 0}</h2>
        </div>

        {subscriptions &&
          subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex items-center justify-between gap-1 p-2 rounded-md bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 ease-in-out"
            >
              <div className="flex-1 flex items-center gap-2">
                <div className="w-13 h-13 grid place-items-center rounded-full bg-accent border-2 border-primary">
                  <h3>{subscription.name.charAt(0)}</h3>
                </div>
                <p className="font-semibold">{subscription.name}</p>
              </div>

              <p>${subscription.amount}</p>
              <Link
                aria-label="[specific sub]-sub-learn-more-link"
                href={"#"}
                className="group link  my-2"
              >
                <MdKeyboardArrowRight className="icon link-child group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subscriptions;
