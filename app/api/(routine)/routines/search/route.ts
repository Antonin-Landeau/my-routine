import { db } from "@/Lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");
  console.log("Search therms", search);

  if (!search) {
    return new NextResponse("No Search therms", { status: 403 });
  }
  const routines = await db.routine.findMany({
    where: {
      title: {
        startsWith: search,
      },
      isPublic: true,
    },
  });
  console.log("Routines res", routines);

  return NextResponse.json(routines);
}
