import React from "react";

import Navbar from "@/components/global/navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedLayout = async ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthenticatedLayout;
