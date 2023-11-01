import Headings from "@/Components/ui/Headings";
import { db } from "@/Lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface MyRoutinesPageProps {}

const MyRoutinesPage: FC<MyRoutinesPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }
  const routines = await db.routine.findMany({
    where: {
      participants: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });
  
  return (
    <main className="mt-20">
      <div className="mx-auto w-fit">
        <Headings
          title={`My Routines`}
          description={`On this page you will find all the routine your participate in`}
        />
      </div>
      {routines.length > 0 && (
        <div className="mx-auto py-10 grid grid-cols-3 w-fit gap-5 border-t">
          {routines.map((routine, index) => (
            <Link
              className="block w-fit"
              href={`/routine/${routine.id}`}
              key={index}
            >
              <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-56">
                <img
                  className="rounded-t-lg h-24 w-full object-cover"
                  src={routine.mainImg}
                  alt=""
                />
                <div className="p-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {routine.title}
                  </h5>
                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                    {routine.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {routines.length === 0 && (
        <div className="max-w-5xl mx-auto text-gray-500 dark:text-gray-400 border-t pt-20 text-center">
          Vous ne participez à aucune routines.{" "}
          <Link
            className="text-blue-600 font-medium hover:underline"
            href={`/routines`}
          >
            Voir toutes les routines
          </Link>
        </div>
      )}
    </main>
  );
};

export default MyRoutinesPage;
