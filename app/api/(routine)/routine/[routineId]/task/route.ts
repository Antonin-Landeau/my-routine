import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
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

    if (!isOwner) {
      return new NextResponse("The routine must be yours", { status: 403 });
    }

    const body = await req.json();
    const { title, description, points } = body;

    const task = await db.task.create({
      data: {
        routineId: params.routineId,
        description,
        title,
        points,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
  }
}
