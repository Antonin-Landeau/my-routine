import { db } from "@/Lib/db";
import React, { FC } from "react";

interface RoutineParticipantProps {
  params: { routineId: string };
}

const RoutineParticipant: FC<RoutineParticipantProps> = async ({ params }) => {
  const participants = await db.participation.findMany({
    where: {
      routineId: params.routineId,
    },
    include: {
      user: true,
    },
  });
  return (
    <div>
      {participants.map((participant, index) => (
        <div className="flex gap-10 my-2" key={index}>
          <div key={index}>{participant.user.name}</div>
          {participant.user.image && (
            <img
              src={participant.user.image}
              alt="userImage"
              className="rounded-full h-6 w-6"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RoutineParticipant;
