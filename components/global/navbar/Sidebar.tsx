import React from "react";
import Link from "next/link";

import { FaTimes } from "react-icons/fa";

import { NAVLINKS } from "@/utils/navLinks";
import { FaGear } from "react-icons/fa6";

interface Props {
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ setOpen }: Props) => {
  return (
    <div className="flex flex-col gap-5 fixed top-0 left-0 w-full h-screen p-5 z-40 bg-primary/85 backdrop-blur-[2px]">
      <button
        onClick={() => setOpen(false)}
        aria-label="sidebar-close-button"
        className="button ml-auto mt-4"
      >
        <FaTimes className="icon" />
      </button>
      <nav className="flex flex-col gap-10 flex-1 items-center justify-center">
        {NAVLINKS.map((navLink, index) => (
          <Link
            aria-label={`${navLink.text}-link`}
            key={index}
            href={navLink.href}
            className="group link justify-start w-[125px]"
          >
            <navLink.icon className="icon link-child" />
            <small className="link-child group-hover:translate-x-1 anim-transition">
              {navLink.text}
            </small>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-5 ml-auto">
        <p className="font-semibold">Hello, User</p>
        <Link href={"#"} aria-label="account-settings-link" className="button">
          <FaGear className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
