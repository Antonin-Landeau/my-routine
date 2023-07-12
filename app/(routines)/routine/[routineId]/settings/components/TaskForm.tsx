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
    setLoading(true);
    try {
      const res = await axios.post(`/api/routine/${routineId}/task`, task);
      toast.success("Task created");
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error("Somting went wrong");
      setLoading(false);
    }
  };

  const onDeleteTask = async (taskId: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/task/${taskId}`);
      toast.success("Task deleted");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Somting went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="mb-5 max-w-2xl">
      <TasksInput
        loading={loading}
        tasks={tasks}
        onChange={(task) => onCreateTask(task)}
        onDelete={(task) => onDeleteTask(task)}
      />
    </div>
  );
};

export default TaskForm;
