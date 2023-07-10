import React, { FC } from "react";

interface HeadingsProps {
  title?: string;
  description?: string;
}

const Headings: FC<HeadingsProps> = ({ description, title }) => {
  return (
    <div className="p-5 flex flex-col gap-3">
      <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default Headings;
