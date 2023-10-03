"use client";
import UserSelector from "@/Components/UserSelector";
import { Historic } from "@/app/api/historical/route";
import axios from "axios";
import { Session } from "next-auth";
import React, { FC, useEffect, useState } from "react";
import HistoricItem from "./HistoricItem";
import { Loader2, ServerCrash } from "lucide-react";

interface HistoricClientProps {
  initialUser: User;
  routineId: string;
}

interface User {
  email: string | null | undefined;
  name: string | null | undefined;
  id: string | null | undefined;
  image: string | null | undefined;
}

const HistoricClient: FC<HistoricClientProps> = ({
  initialUser,
  routineId,
}) => {
  const [historic, setHistoric] = useState<Historic[]>([]);
  const [isLoading, setLaoding] = useState(true);
  const [error, setError] = useState("");

  const getUserHistoric = async (routineId: string, userId: string) => {
    setHistoric([]);
    setLaoding(true);
    try {
      const res = await axios.get(
        `/api/historical?routineId=${routineId}&userId=${userId}`
      );
      setHistoric(res.data);
      setLaoding(false);
    } catch (error) {}
  };
  useEffect(() => {
    getUserHistoric(routineId, initialUser.id!);
  }, []);

  return (
    <div>
      <UserSelector
        onChange={(user) => getUserHistoric(routineId, user.id!)}
        routineId={routineId}
        initialUser={initialUser}
      />
      <div className="full">
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
        <div className="flex flex-col gap-4 mt-5">
          {historic &&
            historic.map((h, index) => (
              <HistoricItem historic={h} key={index} />
            ))}
          {!isLoading && historic.length === 0 && (
            <div className="mx-auto mt-20 text-gray-500">
              No historical
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricClient;
