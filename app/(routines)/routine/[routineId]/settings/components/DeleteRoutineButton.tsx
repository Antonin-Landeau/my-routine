"use client";
import { Button } from "@/Components/ui/Buttons/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface DeleteRoutineButtonProps {
  routineId: string;
}

const DeleteRoutineButton: FC<DeleteRoutineButtonProps> = ({ routineId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/routine/${routineId}`);
      setLoading(false);
      toast.success("Routine has been Deleted");
      router.push("/")
    } catch (error) {
      setLoading(false);
      toast.error("Problem during deletion");
    }
  };
  return (
    <Button
      isLoading={loading}
      variant="desctructive"
      onClick={() => onDelete()}
    >
      Delete Routine
    </Button>
  );
};

export default DeleteRoutineButton;
