import React, { FC } from "react";
import DeleteRoutineButton from "./components/DeleteRoutineButton";

interface RoutineSettingsPageProps {
  params: { routineId: string };
}

const RoutineSettingsPage: FC<RoutineSettingsPageProps> = ({ params }) => {
  return (
    <div>
      <DeleteRoutineButton routineId={params.routineId} />
    </div>
  );
};

export default RoutineSettingsPage;
