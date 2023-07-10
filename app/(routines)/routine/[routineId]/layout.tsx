import { Button } from "@/Components/ui/Buttons/Button";
import Headings from "@/Components/ui/Headings";
import { db } from "@/Lib/db";
import React, { FC, ReactNode } from "react";
import RoutineHeaderCard from "./Components/RoutineHeaderCard";
import { redirect } from "next/navigation";
import RoutineNavBar from "./Components/RoutineNavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

  const isOwner = routine?.author.email === session?.user.email;
  if (!routine) {
    redirect("/");
  }

  return (
    <div className="flex p-10 gap-10">
      <RoutineHeaderCard
        params={params}
        description={routine?.description}
        title={routine?.title}
        imgUrl={routine?.mainImg}
        author={{
          image: routine?.author.image,
          name: routine?.author.name,
        }}
      />

      <div className="flex-grow bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <RoutineNavBar params={params} isOwner={isOwner} />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default RoutineLayout;
