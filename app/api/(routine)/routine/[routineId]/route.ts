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

    const isOwner = await db.routine.findFirst({
      where: {
        id: params.routineId,
        author: {
          email: session.user.email,
        },
      },
    });

    console.log(isOwner)
    if (!isOwner) {
      return new NextResponse("The routine must be yours", { status: 403 });
    }
    console.log("onDelete")
    //delete the routine
    const routine = await db.routine.delete({
      where: {
        id: params.routineId,
      },
    });

    return NextResponse.json({
      message: "routine has been deleted",
    });
  } catch (error) {
    console.log(error)
  }
}
