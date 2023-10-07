import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RoutineFormData } from "@/Types/types";
import { data } from "autoprefixer";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    const body = await req.json();

    const { description, mainImg, tasks, title, isPublic } = body;

    const routine = await db.routine.create({
      data: {
        title,
        description,
        mainImg,
        authorId: session.user.id,
        tasks: {
          create: tasks,
        },
        isPublic,
      },
    });

    const participation = await db.participation.create({
      data: {
        routineId: routine.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(routine);
  } catch (error) {
    console.log("[ROUTINE_POST]", error);
  }
}
