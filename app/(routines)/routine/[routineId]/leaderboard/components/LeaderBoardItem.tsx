import { ILeaderBoardItem } from "@/Types/LeaderBoard";
import React, { FC } from "react";

interface LeaderBoardItemProps {
  item: ILeaderBoardItem;
  index: number;
}

const LeaderBoardItem: FC<LeaderBoardItemProps> = ({ item, index }) => {
  return (
    <div className="flex items-center py-1 gap-4">
      <div>{index + 1}.</div>
      <img
        src={item.user.image}
        className="rounded-full h-6 w-6"
        alt="user-profile-img"
      />
      <div className="text-gray-700">{item.user.name}</div>
      <div className="ml-auto text-gray-700 font-medium">{item.score} pts</div>
    </div>
  );
};

export default LeaderBoardItem;
