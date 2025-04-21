"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaGear } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";

import { NAVLINKS } from "@/utils/navLinks";
import useIsScrolling from "@/hooks/useIsScrolling";
import useScreenWidth from "@/hooks/useScreenWidth";

import Sidebar from "./Sidebar";

const Navbar = () => {
  const isScrolling = useIsScrolling();
  const width = useScreenWidth();

  const [openSB, setOpenSB] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-30 px-5 py-5 flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolling! > 0 && "shadow-sm bg-primary/50 backdrop-blur-xs"
        }`}
      >
        <Image
          src={"/logo.svg"}
          alt="moneyTrack logo"
          priority
          quality={100}
          width={70}
          height={70}
          className="w-[70px] h-[70px]"
        />

        {width! >= 769 ? (
          <>
            <nav className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-10">
              {NAVLINKS.map((navLink, index) => (
                <Link
                  aria-label={`${navLink.text}-link`}
                  key={index}
                  href={navLink.href}
                  className="group link"
                >
                  <navLink.icon className="icon link-child" />
                  <small className="link-child">{navLink.text}</small>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <p className="font-semibold">Hello, User</p>
              <Link
                href={"#"}
                aria-label="account-settings-link"
                className="button"
              >
                <FaGear className="icon" />
              </Link>
            </div>
          </>
        ) : (
          <button
            onClick={() => setOpenSB(true)}
            aria-label="burger-menu-navbar-button"
            className="button"
          >
            <RiMenu3Fill className="icon" />
          </button>
        )}
      </header>
      {openSB && <Sidebar setOpen={setOpenSB} />}
    </>
  );
};

export default Navbar;
