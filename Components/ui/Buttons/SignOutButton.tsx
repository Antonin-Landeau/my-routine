"use client";

import { signOut } from "next-auth/react";
import React, { FC } from "react";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  return (
    <button className="text-red-500" onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export default SignOutButton;
