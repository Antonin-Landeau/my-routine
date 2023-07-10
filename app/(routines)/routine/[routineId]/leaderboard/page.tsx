import { db } from "@/Lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import Leaderboard from "./components/LeaderBoard";

interface RoutineLeaderboardPagedProps {
  params: { routineId: string };
}

const RoutineLeaderboardPaged: FC<RoutineLeaderboardPagedProps> = async ({
  params,
}) => {
  return (
    <div>
      <Leaderboard routineId={params.routineId} />
    </div>
  );
};

export default RoutineLeaderboardPaged;
