"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface NavRoutesProps {}

const NavRoutes: FC<NavRoutesProps> = ({}) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Routines",
      href: `/routines`,
      active: pathname === "/routines",
    },
  ];
  return (
    <div className="ml-5">
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "inline-block p-4 hover:text-gray-600 dark:hover:text-gray-300",
            route.active &&
              "inline-block p-4 text-blue-600  rounded-t-lg active  dark:text-blue-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default NavRoutes;
