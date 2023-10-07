import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("No User", { status: 403 });
    }

    if (!params.taskId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const task = await db.task.delete({
      where: {
        id: params.taskId,
      },
    });
    console.log(task);

    return NextResponse.json({
      message: "routine has been deleted",
    });
  } catch (error) {
    console.log(error);
  }
}
