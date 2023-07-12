import React, { FC } from "react";
import DeleteRoutineButton from "./components/DeleteRoutineButton";
import RoutineForm from "./components/RoutineForm";
import { db } from "@/Lib/db";
import { Prisma, Routine } from "@prisma/client";
import { redirect } from "next/navigation";
import SubHeading from "@/Components/ui/Typogrphy/SubHeading";
import TaskForm from "./components/TaskForm";

interface RoutineSettingsPageProps {
  params: { routineId: string };
}

const RoutineSettingsPage: FC<RoutineSettingsPageProps> = async ({
  params,
}) => {
  const routine = await db.routine.findFirst({
    where: {
      id: params.routineId,
    },
    include: {
      tasks: true,
    },
  });

  if (!routine) {
    redirect("/");
  }

  return (
    <div className="p-5 overflow-auto h-[80vh]">
      <SubHeading label="Update Routine" />
      <RoutineForm initialRoutine={routine} routineId={params.routineId} />
      <SubHeading label="Update Taks" />
      <TaskForm routineId={params.routineId} tasks={routine.tasks} />
      <SubHeading label="Delete Routine" />
      <DeleteRoutineButton routineId={params.routineId} />
    </div>
  );
};

export default RoutineSettingsPage;
