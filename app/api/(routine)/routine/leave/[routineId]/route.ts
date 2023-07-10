import { db } from "@/Lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { routineId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    if (!params.routineId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.participation.deleteMany({
      where: {
        userId: session.user.id,
        routineId: params.routineId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[DELET_ROUTINE_LEAVE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
