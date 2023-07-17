import { db } from "@/Lib/db";
import { CloudLightning } from "lucide-react";
import { NextResponse } from "next/server";

type ScoreResponse = {
  id: string;
  createdAt: string;
  task: {
    id: string;
    description: string | undefined;
    points: number | undefined;
    routineId: string | undefined;
    title: string | undefined;
  };
  taskId: string | null;
  userId: string;
};

export type Historic = {
  date: string;
  score: number | undefined;
  tasks: {
    id: string;
    description: string | undefined;
    points: number | undefined;
    routineId: string | undefined;
    title: string | undefined;
  }[];
};

function transformArray(array: ScoreResponse[]): Historic[] {
  const transformedArray: Historic[] = [];

  for (const obj of array) {
    const createdAt = obj.createdAt;
    const points = obj.task.points;

    const existingObj = transformedArray.find(
      (item) => item.date === createdAt
    );

    if (existingObj && points && existingObj.score) {
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const routineId = searchParams.get("routineId");
  const userId = searchParams.get("userId");

  if (!routineId || !userId) {
    new NextResponse("Routine And user id's are required", { status: 403 });
    return;
  }

  try {
    const scores = await db.score.findMany({
      where: {
        userId,
      },
      include: {
        task: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatedRes = scores.map((s) => {
      return {
        id: s.id,
        createdAt: s.createdAt,
        task: {
          id: s.task!.id!,
          description: s.task?.description,
          points: s.task?.points,
          routineId: s.task?.routineId,
          title: s.task?.title,
        },
        taskId: s.taskId,
        userId: s.userId,
      };
    });

    const Formatedhistorics = transformArray(formatedRes);

    return NextResponse.json(Formatedhistorics);
  } catch (error) {}
}
