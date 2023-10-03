import { db } from "@/lib/db";
import Link from "next/link";
import React, { FC } from "react";

interface RoutinesPageProps {}

const RoutinesPage: FC<RoutinesPageProps> = async ({}) => {
  const routine = await db.routine.findMany();

  return (
    <main className="mt-20">
      <div className="p-10">
        {routine.map((routine, index) => (
          <Link
            className="block w-fit"
            href={`/routine/${routine.id}`}
            key={index}
          >
            <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={routine.mainImg} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {routine.title}
                </h5>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {routine.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default RoutinesPage;
