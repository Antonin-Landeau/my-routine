import { Button } from "@/Components/ui/Buttons/Button";
import Headings from "@/Components/ui/Headings";
import { db } from "@/Lib/db";
import React, { FC, ReactNode } from "react";
import RoutineHeaderCard from "./Components/RoutineHeaderCard";
import { redirect } from "next/navigation";
import RoutineNavBar from "./Components/RoutineNavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isParticipating } from "@/app/Service/routine";

interface RoutineLayoutProps {
  children: ReactNode;
  params: { routineId: string };
}

const RoutineLayout: FC<RoutineLayoutProps> = async ({ children, params }) => {
  const session = await getServerSession(authOptions);
  const routine = await db.routine.findFirst({
    where: {
      id: params.routineId,
    },
    include: {
      author: true,
    },
  });

  const isParticipant = await isParticipating(
    session?.user.id,
    params.routineId
  );

  const isOwner = routine?.author.email === session?.user.email;

  if (!routine) {
    redirect("/");
  }

  if (!routine.isPublic) {
    console.log(isOwner);
    if (!session) {
      redirect("/");
    }
    if (!isOwner && !isParticipant) {
      redirect("/");
    }
  }

  return (
    <main className="mt-20">
      <div className="flex p-10 gap-10 max-w-7xl m-auto">
        <RoutineHeaderCard
          params={params}
          description={routine?.description}
          title={routine?.title}
          imgUrl={routine?.mainImg}
          author={{
            image: routine?.author.image,
            name: routine?.author.name,
          }}
          isParticipant={isParticipant ? true : false}
          isPublic={routine.isPublic}
        />

        <div className="flex-grow bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <RoutineNavBar
            isParticipant={isParticipant ? true : false}
            params={params}
            isOwner={isOwner}
          />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default RoutineLayout;
