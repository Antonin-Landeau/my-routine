import React, { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ label, name, className, ...rest }) => {
  const c = twMerge(
    "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    className
  );

  return (
    <div className="flex flex-col">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input {...rest} className={c} />
    </div>
  );
};

export default TextInput;
