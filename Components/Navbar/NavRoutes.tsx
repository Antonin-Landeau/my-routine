"use client";
import { cn } from "@/Lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface NavRoutesProps {
  isLoggedIn: boolean;
}

const NavRoutes: FC<NavRoutesProps> = ({ isLoggedIn }) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Routines",
      href: `/routines`,
      active: pathname === "/routines",
    },
  ];

  if (isLoggedIn) {
    routes.push({
      label: "MyRoutines",
      href: `/routines/mine`,
      active: pathname === "/routines/mine",
    });
  }
  return (
    <div className="ml-5">
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "inline-block p-4 hover:text-gray-600 dark:hover:text-gray-300",
            route.active &&
              "inline-block p-4 font-semibold text-blue-600  rounded-t-lg active  dark:text-blue-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default NavRoutes;
