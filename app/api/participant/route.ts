import { db } from "@/Lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const routineId = searchParams.get("routineId");

  if (!routineId) {
    new NextResponse("Routine And user id's are required", { status: 403 });
    return;
  }

  try {
    const participants = await db.participation.findMany({
      where: {
        routineId: routineId,
      },
      include: {
        user: true,
      },
    });


    return NextResponse.json(participants);
  } catch (error) {}
}
