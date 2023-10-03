"use client";
import { db } from "@/lib/db";
import { ILeaderBoardItem } from "@/Types/LeaderBoard";
import axios from "axios";
import { Loader2, ServerCrash } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import LeaderBoardItem from "./LeaderBoardItem";

interface LeaderboardProps {
  routineId: string;
}

const Leaderboard: FC<LeaderboardProps> = ({ routineId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [leaderboard, setLeaderBoard] = useState<ILeaderBoardItem[]>();

  const getLeaderBoard = async () => {
    setIsLoading(true);
    try {
      const leaderboard = await axios.get(
        `/api/routine/${routineId}/leaderboard`
      );
      setLeaderBoard(leaderboard.data.res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error) {
        setError("Somting went wrong");
      }
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader2 className="mx-auto mt-20 h-8 w-8 animate-spin text-gray-500" />
      ) : null}
      {error ? (
        <div className="flex flex-col gap-4">
          <ServerCrash className="mx-auto mt-20 h-8 w-8 text-gray-500 " />
          <p className="text-gray-500 text-center font-semibold text-sm">
            {error}
          </p>
        </div>
      ) : null}

      {leaderboard &&
        leaderboard.map((lbItem, index) => (
          <LeaderBoardItem index={index} item={lbItem} key={index} />
        ))}
    </div>
  );
};

export default Leaderboard;
