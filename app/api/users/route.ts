import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const session = await getServerSession(authOptions);

  if (!search) {
    new NextResponse("email", { status: 403 });
    return;
  }

  try {
    const users = await db.user.findMany({
      where: {
        email: {
          contains: search,
          not: session?.user.email,
        },
      },
      include: {
        recivedInvitation: true,
        sendInvitation: true,
      },
      take: 3,
    });

    return NextResponse.json(users);
  } catch (error) {}
}
