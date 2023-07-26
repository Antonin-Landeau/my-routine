"use client";

import { Button } from "@/Components/ui/Buttons/Button";
import { Routine, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

interface InvitationCardProps {
  invitation: Invitation;
}

interface Invitation {
  id: string;
  senderId: string;
  reciverId: string;
  status: string;
  routineId: string;
  notificationId: string | null;
  routine: Routine;
  from: User;
}

const InvitationCard: FC<InvitationCardProps> = ({ invitation }) => {
  const router = useRouter();

  const handleAcceptInvitation = async (invitation: Invitation) => {
    try {
      const res = await axios.patch(`/api/invitation/${invitation.id}/accept`, {
        routineId: invitation.routineId,
      });
      console.log(res);

      if (res.status === 200) {
        toast.success("You can now participate to this Routine");
        router.push(`/routine/${invitation.routineId}`);
      }
    } catch (error) {}
  };

  return (
    <div className="p-5 border-b max-w-lg mx-auto">
      <div>
        <h2 className="flex gap-1 mb-4">
          <span className="flex gap-1">
            {invitation.from.image && (
              <Image
                src={invitation.from.image}
                alt="user-profile-picture"
                className="rounded-full"
                width={24}
                height={20}
              />
            )}
            <div className="font-medium">{invitation.from.name}</div>
          </span>
          vous invite à rejoindre{" "}
          <span className="font-medium">{invitation.routine.title}</span>
        </h2>
        {invitation.status === "pending" && (
          <div className="flex items-center gap-5 w-60 mx-auto ">
            <Button
              className="py-2"
              onClick={() => handleAcceptInvitation(invitation)}
            >
              Accepter
            </Button>
            <Button className="py-2" variant="outline">
              Refuser
            </Button>
          </div>
        )}
        {invitation.status === "accepted" && (
          <p className="text-gray-500 text-sm text-center">
            Vous avez accepter cette invitation
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
