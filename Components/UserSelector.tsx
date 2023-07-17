"use client";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import React, { FC, useEffect, useState } from "react";

interface UserSelectorProps {
  routineId: string;
  initialUser: User;
  onChange: (participant: User) => void;
}

interface User {
  email: string | null | undefined;
  name: string | null | undefined;
  id: string | null | undefined;
  image: string | null | undefined;
}

const UserSelector: FC<UserSelectorProps> = ({
  initialUser,
  routineId,
  onChange,
}) => {
  const [selectedParticipant, setSelectedParticipant] =
    useState<User>(initialUser);
  const [participants, setParticipants] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const selectUser = (participant: User) => {
    setSelectedParticipant(participant);
    setOpen(false);
    onChange(participant);
  };

  useEffect(() => {
    const getParticipant = async (routineId: string) => {
      try {
        const res = await axios.get(`/api/participant?routineId=${routineId}`);
        const formatedParticipant = res.data.map((u: any) => u.user);
        setParticipants(formatedParticipant);
      } catch (error) {}
    };
    getParticipant(routineId);
  }, []);

  return (
    <div className="border p-3 rounded-lg w-fit relative">
      <div className="flex items-center gap-3">
        {selectedParticipant.name}
        {selectedParticipant.image && (
          <img
            src={selectedParticipant.image}
            className="w-5 h-5 rounded-full"
            alt="user-image"
          />
        )}
        <ChevronDown
          onClick={() => setOpen(!open)}
          className={`text-gray-500 h-5 w-5 hover:cursor-pointer transition-all ease-out duration-200 ${
            open && "rotate-180"
          }`}
        />
      </div>
      {open && (
        <div className="absolute top-[calc(100%+5px)] p-3 border rounded-md w-full left-0 bg-white">
          {participants &&
            participants.map((participant, index) => (
              <div
                className="flex items-center justify-between gap-3 py-1 px-3 rounded-md hover:cursor-pointer hover:bg-gray-200"
                key={index}
                onClick={() => selectUser(participant)}
              >
                {participant.name}
                {participant.image && (
                  <img
                    src={participant.image}
                    alt="user-img"
                    className="w-5 h-5 rounded-full"
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserSelector;
