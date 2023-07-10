"use client";
import { signIn } from "next-auth/react";
import { FC } from "react";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default SignInButton;
