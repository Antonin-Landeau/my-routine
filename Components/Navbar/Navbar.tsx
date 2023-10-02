import { signIn } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import SignInButton from "../ui/Buttons/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfo from "./UserInfo";
import SignOutButton from "../ui/Buttons/SignOutButton";
import NavRoutes from "./NavRoutes";
import { Bell, Plus, PlusSquare, PlusSquareIcon } from "lucide-react";
import Image from "next/image";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 w-full z-20 bg-slate-50 flex border-b border-gray-300 items-center h-20">
      <div className="pl-8 pr-8 flex items-center w-full max-w-[1700px] m-auto">
        <Link href="/">
          <Image src="/Logo.svg" alt="logo" width={35} height={35} />
        </Link>
        <NavRoutes />
        <nav className="ml-auto">
          {session?.user ? (
            <div
              className="flex gap-3
            "
            >
              <Link href={`/notifications`}>
                <Bell className="h-9 w-9 p-2 border text-gray-700 hover:cursor-pointer hover:bg-gray-200 rounded-lg" />
              </Link>
              <Link href={`/routine/new`}>
                <Plus className="h-9 w-9 p-2 border text-gray-700 hover:cursor-pointer hover:bg-gray-200 rounded-lg" />
              </Link>
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
