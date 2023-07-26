import { getServerSession } from "next-auth";
import React, { FC, ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

interface NotificationLayoutProps {
  children: ReactNode;
}

const NotificationLayout: FC<NotificationLayoutProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default NotificationLayout;
