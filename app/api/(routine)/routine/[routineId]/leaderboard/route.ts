import { db } from "@/Lib/db";
import { ILeaderBoardItem, LeaderBoardRes } from "@/Types/LeaderBoard";
import Leaderboard from "@/app/(routines)/routine/[routineId]/leaderboard/components/LeaderBoard";
import { Score, User } from "@prisma/client";
import { NextResponse } from "next/server";

const formatDataToLeaderBoard = (array: any) => {
  const arrayTyped = array as LeaderBoardRes[];
  const leaderBoardRes: ILeaderBoardItem[] = [];
  for (const obj of arrayTyped) {
    console.log(obj.userId);
    const existingObject = leaderBoardRes.find(
      (item) => item.user.id === obj.userId
    );
    console.log(existingObject);
    if (!existingObject) {
      console.log("no Index creting it");
      const newUserLeaderBoard: ILeaderBoardItem = {
        user: {
          id: obj.userId,
          image: obj.user.image,
          name: obj.user.name,
        },
        score: obj.task.points,
      };

      leaderBoardRes.push(newUserLeaderBoard);
    } else {
      console.log("Update index");

      existingObject.score += obj.task.points;
    }
  }
  console.log(leaderBoardRes);
  return leaderBoardRes;
};

export async function GET(
  req: Request,
  { params }: { params: { routineId: string } }
) {
  try {
    const res = await db.score.findMany({
      where: {
        routineId: params.routineId,
      },
      include: {
        user: true,
        task: true,
      },
    });
    const leaderboard = formatDataToLeaderBoard(res);

    const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      res: sortedLeaderboard,
    });
  } catch (error) {
    console.log(error);
  }
}
