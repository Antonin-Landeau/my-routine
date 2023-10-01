import Headings from "@/Components/ui/Headings";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/Lib/db";
import InvitationCard from "./Components/InvitationCard";

interface NotificaitonPageProps {}

const page: FC<NotificaitonPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);

  const invitations = await db.invitation.findMany({
    where: {
      reciverId: session?.user.id,
    },
    include: { routine: true, from: true },
  });
  console.log("------------------------Invitation", invitations);

  return (
    <main className="max-w-3xl mx-auto mt-20">
      <Headings
        title="Notifications"
        description="You can find all your notifications in this page"
      />
      <div className="border-b my-2"></div>
      {invitations.map((invitation, index) => (
        <InvitationCard key={index} invitation={invitation} />
      ))}
    </main>
  );
};

export default page;
