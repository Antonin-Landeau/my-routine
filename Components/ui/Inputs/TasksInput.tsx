import TextArea from "@/Components/ui/Inputs/TextArea";
import TextInput from "@/Components/ui/Inputs/TextInput";
import { Task } from "@/Types/types";
import { Loader2, Plus, PlusCircle } from "lucide-react";
import React, { FC, useState } from "react";

interface TasksInputProps {
  onChange: (task: Task) => void;
  onDelete: (index: string) => void;
  tasks: Task[];
  loading?: boolean;
}

const TasksInput: FC<TasksInputProps> = ({
  tasks,
  loading,
  onChange,
  onDelete,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [points, setPoints] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addTask = () => {
    if (!title || !description || !points) {
      setError("Veuillez rentrer tout les champs pour crée la tache");
      return;
    }
    onChange({
      title,
      description,
      points: +points,
    });
    setError("");
    setTitle("");
    setDescription("");
    setPoints("");
  };
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-2 gap-x-5">
        <div className="col-start-1 col-span-4">
          <TextInput
            label="Task name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=" col-span-2">
          <TextInput
            label="Task points"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="col-span-6">
          <TextArea
            value={description}
            label="Task description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <p className="text-red-500 text-xs mt-3">{error}</p>
      <div className="flex items-center gap-2 w-fit ml-auto">
        {loading && (
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-700" />
        )}

        <button
          disabled={loading}
          type="button"
          onClick={addTask}
          className="flex items-center p-2 ml-auto w-fit text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Task
        </button>
      </div>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Points
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, index) => (
                <tr
                  key={task.id ? task.id : index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {task.title}
                  </th>
                  <td className="px-6 py-2">{task.points}</td>
                  <td className="px-6">
                    <button
                      type="button"
                      className="text-red-700 px-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-xs text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={() => onDelete(`${task.id ? task.id : index}`)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="mx-auto w-fit text-xs my-3 text-gray-600">
            No tasks.
          </div>
        )}
      </div>
    </>
  );
};

export default TasksInput;
