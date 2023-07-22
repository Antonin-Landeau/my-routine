"use client";

import { Session, User } from "next-auth";
import { FC, useState } from "react";

interface UserInfoProps {
  session: Session;
}

const UserInfo: FC<UserInfoProps> = ({ session }) => {
  const [isOpen, setIsOpent] = useState<boolean>(false);
  return (
    <div className="flex items-center gap-2">
      <div>Hi, {session.user?.name}</div>
      <img
        src={session.user?.image!}
        alt="profile picture"
        className="w-8 rounded-full"
      />
    </div>
  );
};

export default UserInfo;
