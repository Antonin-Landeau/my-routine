"use client";
import { Button } from "@/Components/ui/Buttons/Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface ParticipateLeaveRoutineToggleProps {
  routineId: string;
  isParticipant: boolean;
  user: boolean;
}

const ParticipateLeaveRoutineToggle: FC<ParticipateLeaveRoutineToggleProps> = ({
  routineId,
  isParticipant,
  user,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const Participate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/routine/participate", {
        routineId,
      });
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 403) {
        router.push(
          "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
        );
      }
      console.log(error);
      setIsLoading(false);
    }
  };

  const Leave = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/routine/leave/${routineId}`);
      console.log(res);
      setIsLoading(false);

      router.refresh();
    } catch (error) {}
  };
  return (
    <>
      {!user && !isParticipant && (
        <Button isLoading={isLoading} onClick={() => Participate()}>
          Participer
        </Button>
      )}
      {!isParticipant && user && (
        <Button isLoading={isLoading} onClick={() => Participate()}>
          Participer
        </Button>
      )}
      {isParticipant && user && <Button onClick={() => Leave()}>Leave</Button>}
    </>
  );
};

export default ParticipateLeaveRoutineToggle;
