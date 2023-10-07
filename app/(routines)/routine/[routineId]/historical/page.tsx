import { db } from "@/lib/db";
import { Historic, ScoreResponse } from "@/Types/Historic";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Score } from "@prisma/client";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import HistoricItem from "./components/HistoricItem";
import HistoricClient from "./components/HistoricClient";

interface RoutineHistoricPageProps {
  params: { routineId: string };
}

function transformArray(array: any): Historic[] {
  const transformedArray: Historic[] = [];

  for (const obj of array) {
    const createdAt = obj.createdAt;
    const points = obj.task.points;

    const existingObj = transformedArray.find(
      (item) => item.date === createdAt
    );

    if (existingObj) {
      existingObj.score += points;
      existingObj.tasks.push(obj.task);
    } else {
      const newObj: Historic = {
        date: createdAt,
        score: points,
        tasks: [obj.task],
      };
      transformedArray.push(newObj);
    }
  }

  return transformedArray;
}

const RoutineHistoricPage: FC<RoutineHistoricPageProps> = async ({
  params,
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return;
  }

  const scores = await db.score.findMany({
    where: {
      userId: session?.user.id,
      routineId: params.routineId,
    },
    include: {
      task: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const historics: Historic[] = transformArray(scores);

  return (
    <div className="flex flex-col gap-5">
      <HistoricClient
        routineId={params?.routineId}
        initialUser={{
          email: session.user.email,
          id: session.user.id,
          name: session.user.name,
          image: session.user.image,
        }}
      />
      {/* {historics.map((historic: Historic, index: any) => (
        <HistoricItem historic={historic} key={index} />
      ))} */}
    </div>
  );
};

export default RoutineHistoricPage;
