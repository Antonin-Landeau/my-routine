import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React, { FC } from "react";
import RoutineForm from "./Components/RoutineForm";

interface CreateRoutinePageProps {}

const CreateRoutinePage: FC<CreateRoutinePageProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
  }
  return (
    <div>
      <RoutineForm />
    </div>
  );
};

export default CreateRoutinePage;
