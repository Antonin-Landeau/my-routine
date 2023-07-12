"use client";
import { Task } from "@prisma/client";
import React, { FC, FormEvent, useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import { Button } from "@/Components/ui/Buttons/Button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TaskFormProps {
  tasks: Task[] ;
  params: { routineId: string };
  completedTasks: Task[];
}

const TaskForm: FC<TaskFormProps> = ({ tasks, params, completedTasks }) => {
  const [points, setPoints] = useState<number>(0);
  const [tasksDone, setTasksDone] = useState<Task[]>(completedTasks);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //fetch les tasks done dans la table score et si l'id est pareil que la tache mettre checked

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      routineId: params.routineId,
      tasksDone,
    };
    try {
      const res = await axios.post("/api/score", formData);
      setIsLoading(false);
      toast.success("Tasks saved");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error: Can't save tour tasks");
    }
    //routineId
    //points(some de toutes les tache)
    //tasksDone(array des tach faites)
  };

  useEffect(() => {
    const pts = tasksDone.reduce((acc, task) => acc + task.points, 0);
    setPoints(pts);
  }, [tasksDone]);

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => onSubmit(e)}>
      {tasks.map((task, index) => {
        return (
          <TaskInput
            checked={completedTasks.some((ct) => ct.id === task.id)}
            onComplete={(task) => setTasksDone((prev) => [...prev, task])}
            onDelete={(task) =>
              setTasksDone((prev) => prev.filter((t) => task.id !== t.id))
            }
            key={index}
            task={task}
            index={index}
          />
        );
      })}
      <Button isLoading={isLoading} type="submit">
        Save
      </Button>
    </form>
  );
};

export default TaskForm;
