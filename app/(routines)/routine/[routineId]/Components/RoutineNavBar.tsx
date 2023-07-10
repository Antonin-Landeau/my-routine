"use client";

import { cn } from "@/Lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface RoutineNavBarProps {
  params: { routineId: string };
  isOwner: boolean;
}

const RoutineNavBar: FC<RoutineNavBarProps> = ({ params, isOwner }) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Tasks",
      href: `/routine/${params.routineId}`,
      active: pathname === `/routine/${params.routineId}`,
    },
    {
      label: "Participants",
      href: `/routine/${params.routineId}/participants`,
      active: pathname === `/routine/${params.routineId}/participants`,
    },
    {
      label: "Leaderboard",
      href: `/routine/${params.routineId}/leaderboard`,
      active: pathname === `/routine/${params.routineId}/leaderboard`,
    },
  ];

  if (isOwner) {
    routes.push({
      label: "Settings",
      href: `/routine/${params.routineId}/settings`,
      active: pathname === `/routine/${params.routineId}/settings`,
    });
  }
  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {routes.map((route, index) => (
          <li className="mr-2" key={index}>
            <Link
              href={route.href}
              aria-current="page"
              className={cn(
                "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                route.active &&
                  "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
              )}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineNavBar;
