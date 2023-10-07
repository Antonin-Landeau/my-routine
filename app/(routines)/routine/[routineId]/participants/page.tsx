import InvitationForm from "@/Components/Forms/InvitationForm";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface RoutineParticipantProps {
  params: { routineId: string };
}

const RoutineParticipant: FC<RoutineParticipantProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const participants = await db.participation.findMany({
    where: {
      routineId: params.routineId,
    },
    include: {
      user: true,
    },
  });

  const routine = await db.routine.findFirst({
    where: {
      id: params.routineId,
    },
    include: {
      author: true,
    },
  });

  if (!routine) {
    redirect("/");
  }

  return (
    <div>
      {/* verifier si routine est priver et si utilisateur connecter est le créateur et on affiche le formulaire */}
      {!routine.isPublic && session?.user.id === routine.author.id && (
        <InvitationForm routineId={params.routineId} />
      )}
      <div className="border-b my-5"></div>
      {participants.map((participant, index) => (
        <div className="flex items-center gap-4 my-2" key={index}>
          {participant.user.image && (
            <Image
              src={participant.user.image}
              alt="user-profile-picture"
              className="rounded-full"
              width={24}
              height={20}
            />
          )}
          <div key={index} className="text-sm">
            {participant.user.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoutineParticipant;
