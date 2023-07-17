"use client";
import { cn } from "@/Lib/utils";
import { Historic } from "@/app/api/historical/route";
import { Check, ChevronDown } from "lucide-react";
import React, { FC, useState } from "react";

interface HistoricItemProps {
  historic: Historic;
}

const HistoricItem: FC<HistoricItemProps> = ({ historic }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="border rounded-md px-5 py-2">
      <div className="flex items-center h-10 gap-3 ">
        <div>{historic.date}</div>
        <div className="ml-auto">{historic.score} pts</div>
        <ChevronDown
          onClick={() => setOpen(!open)}
          className={`text-gray-500 h-5 w-5 hover:cursor-pointer transition-all ease-out duration-200 ${
            open && "rotate-180"
          }`}
        />
      </div>
      <div className={cn("", open && "border-t")}>
        {open && (
          <div className="mb-3 text-gray-500 dark:text-gray-400 text-sm">
            {historic.tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 pr-8 my-1">
                <Check className="text-green-500 w-5" />
                <div>{task.title}</div>
                <span className="ml-auto">{task.points} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricItem;
