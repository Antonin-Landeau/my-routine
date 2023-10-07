import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { generateDate } from "@/lib/utils";
import { Task } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    const body = await req.json();

    const { tasksDone, routineId } = body;
    console.log(tasksDone);
    console.log(routineId);
    const createdAt = generateDate();

    const formatedData = tasksDone.map((task: Task) => {
      return {
        taskId: task.id,
        userId: session.user.id,
        createdAt: generateDate(),
        routineId,
      };
    });
    console.log(formatedData);

    const d = await db.score.deleteMany({
      where: {
        userId: session.user.id,
        createdAt: generateDate(),
      },
    });

    const scores = await db.score.createMany({
      data: formatedData,
    });

    return NextResponse.json({
      message: "Scores has been created",
    });
  } catch (error) {
    console.log("[TASK_PUT]", error);
  }
}
