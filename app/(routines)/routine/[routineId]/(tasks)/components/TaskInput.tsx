"use client";

import { Task } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { FC, useState } from "react";

interface TaskInputProps {
  task: Task;
  index: number;
  checked: boolean;
  onDelete: (task: Omit<Task, "scoreId">) => void;
  onComplete: (task: Omit<Task, "scoreId">) => void;
}

const TaskInput: FC<TaskInputProps> = ({
  task,
  index,
  checked,
  onComplete,
  onDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const handleChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onComplete(task);
    } else {
      onDelete(task);
    }
  };

  return (
    <div className="border rounded-md px-5 py-2">
      <div className="flex items-center h-10 gap-3">
        <div>{index + 1}.</div>
        <div>{task.title}</div>
        <div className="ml-auto">{task.points} pts</div>
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={() => handleChange()}
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <ChevronDown
          onClick={() => setOpen(!open)}
          className={`text-gray-500 h-5 w-5 hover:cursor-pointer transition-all ease-out duration-200 ${
            open && "rotate-180"
          }`}
        />
      </div>
      {open && (
        <div className="mb-3 text-gray-500 dark:text-gray-400 text-sm">
          {task.description}
        </div>
      )}
    </div>
  );
};

export default TaskInput;
