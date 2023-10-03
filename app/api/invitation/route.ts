import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/Lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    const body = await req.json();

    const { routineId, reciverId } = body;

    const invitation = await db.invitation.create({
      data: {
        routineId: routineId,
        senderId: session.user.id,
        reciverId,
        status: "pending",
      },
    });
    console.log(invitation);

    return NextResponse.json({
      message: `User ${session.user.id} invite user : ${reciverId} to routine ${routineId}`,
    });
  } catch (error) {
    console.log("[ROUTINE_PARTICIPATE_POST]", error);
  }
}
