import { db } from "@/Lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    const body = await req.json();

    const { routineId } = body;

    const participation = await db.participation.create({
      data: {
        routineId: routineId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: `User ${session.user.id} participate to routine ${routineId}`,
      data: {
        participation,
      },
    });
  } catch (error) {
    console.log("[ROUTINE_PARTICIPATE_POST]", error);
  }
}
