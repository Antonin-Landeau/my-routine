import { db } from "@/Lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const routines = await db.routine.findMany({
      where: {
        isPublic: true,
      },
    });

    return NextResponse.json(routines);
  } catch (error) {}
}
