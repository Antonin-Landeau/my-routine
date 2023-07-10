import { db } from "@/Lib/db";
import { Historic, ScoreResponse } from "@/Types/Historic";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Score } from "@prisma/client";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import HistoricItem from "./components/HistoricItem";

interface RoutineHistoricPageProps {}

function transformArray(array: ScoreResponse[]): Historic[] {
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

const RoutineHistoricPage: FC<RoutineHistoricPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  const scores = await db.score.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      task: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const historics = transformArray(scores);

  return (
    <div className="flex flex-col gap-5">
      {historics.map((historic: Historic, index) => (
        <HistoricItem historic={historic} key={index} />
      ))}
    </div>
  );
};

export default RoutineHistoricPage;
