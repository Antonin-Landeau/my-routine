"use client";

import TasksInput from "@/Components/ui/Inputs/TasksInput";
import { Task } from "@/Types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface TaskFormProps {
  tasks: Task[];
  routineId: string;
}

const TaskForm: FC<TaskFormProps> = ({ tasks, routineId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onCreateTask = async (task: Task) => {
    try {
      const res = await axios.post(`/api/routine/${routineId}/task`, task);
      toast.success("Task created");
      router.refresh();
    } catch (error) {}
  };
  return (
    <div className="mb-5 max-w-2xl">
      <TasksInput
        loading={loading}
        tasks={tasks}
        onChange={(task) => onCreateTask(task)}
        onDelete={(task) => console.log(task)}
      />
    </div>
  );
};

export default TaskForm;
