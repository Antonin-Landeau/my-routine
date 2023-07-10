import { signIn } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import SignInButton from "../ui/Buttons/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfo from "./UserInfo";
import SignOutButton from "../ui/Buttons/SignOutButton";
import NavRoutes from "./NavRoutes";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
  return (
    <div className=" flex border-b border-gray-300 items-center h-12">
      <div className="px-8 flex items-center w-full">
        <Link href="/">
          <h1>App</h1>
        </Link>
        <NavRoutes />
        <nav className="ml-auto">
          {session?.user ? (
            <div
              className="flex gap-2
            "
            >
              <UserInfo session={session} />
              <SignOutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
