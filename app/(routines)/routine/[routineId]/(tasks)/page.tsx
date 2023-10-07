import { db } from "@/Lib/db";
import { isParticipating } from "@/app/Service/routine";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Divide } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import TaskForm from "./components/TaskForm";
import { generateDate } from "@/Lib/utils";

interface RoutineOverviewPageProps {
  params: { routineId: string };
}

export const revalidate = 0;

const RoutineOverviewPage: FC<RoutineOverviewPageProps> = async ({
  params,
}) => {
  const session = await getServerSession(authOptions);

  const isParticipant = await isParticipating(
    session?.user.id,
    params.routineId
  );

  const tasks = await db.task.findMany({
    where: {
      routineId: params.routineId,
    },
  });

  const completedTasks = await db.score.findMany({
    where: {
      userId: session?.user.id,
      createdAt: generateDate(),
      task: {
        routineId: params.routineId,
      },
    },
    select: {
      task: true,
    },
  });

  const formatedCompletedTasks: any = completedTasks.map((t) => t.task);

  return (
    <div>
      {isParticipant && (
        <div>
          <TaskForm
            params={params}
            tasks={tasks}
            completedTasks={formatedCompletedTasks}
          />
        </div>
      )}
      {!isParticipant && (
        <div>
          {tasks &&
            tasks.map((task, index) => (
              <div key={index} className=" flex gap-5 my-3">
                <div>{index}</div>
                <div>
                  <h2>{task.title}</h2>

                  <p>{task.description}</p>
                </div>
                <span>{task.points} pts</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RoutineOverviewPage;
