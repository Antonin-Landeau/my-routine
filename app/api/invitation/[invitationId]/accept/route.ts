import { db } from "@/Lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { invitationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();

    const { routineId } = body;

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    await db.invitation.update({
      where: {
        id: params.invitationId,
      },
      data: {
        status: "accepted",
      },
    });

    const participation = await db.participation.create({
      data: {
        routineId: routineId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: `user: ${session.user.id} accept the invatation`,
    });
  } catch (error) {}
}
