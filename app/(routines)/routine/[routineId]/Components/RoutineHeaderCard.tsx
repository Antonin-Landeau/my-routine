import { Button } from "@/components/ui/Buttons/Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import ParticipateLeaveRoutineToggle from "./ParticipateLeaveRoutineToggle";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface RoutineHeaderCardProps {
  title?: string;
  description?: string;
  imgUrl?: string;
  author?: {
    name?: string | null;
    image?: string | null;
  };
  isParticipant: boolean;
  params: { routineId: string };
  isPublic: boolean;
}

const RoutineHeaderCard: FC<RoutineHeaderCardProps> = async ({
  description,
  imgUrl,
  title,
  author,
  params,
  isParticipant,
  isPublic,
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={imgUrl} alt="routine-main-image" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        {author && (
          <p className="flex mb-3 gap-3">
            created by {author.name}{" "}
            {author.image && (
              <img src={author.image} alt="" className="rounded-full h-6 w-6" />
            )}
          </p>
        )}
        {isPublic && (
          <ParticipateLeaveRoutineToggle
            routineId={params.routineId}
            isParticipant={isParticipant ? true : false}
            user={session ? true : false}
          />
        )}
      </div>
    </div>
  );
};

export default RoutineHeaderCard;
