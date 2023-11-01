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
import { db } from "@/Lib/db";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  const newInvitation = await db.invitation.count({
    where: {
      status: "pending",
      reciverId: session?.user.id,
    },
  });

  return (
    <div className="fixed top-0 w-full z-20 bg-slate-50 flex border-b border-gray-300 items-center h-20">
      <div className="pl-8 pr-8 flex items-center w-full max-w-[1700px] m-auto">
        <Link href="/">
          <Image src="/Logo.svg" alt="logo" width={35} height={35} />
        </Link>
        <NavRoutes isLoggedIn={session?.user ? true : false} />
        <nav className="ml-auto">
          {session?.user ? (
            <div
              className="flex gap-3
            "
            >
              <Link href={`/notifications`} className="relative">
                <Bell className="h-9 w-9 p-2 border text-gray-700 hover:cursor-pointer hover:bg-gray-200 rounded-lg" />
                {newInvitation > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {newInvitation}
                  </div>
                )}
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
