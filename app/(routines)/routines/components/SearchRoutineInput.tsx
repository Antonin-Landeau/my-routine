"use client";
import TextInput from "@/Components/ui/Inputs/TextInput";
import { Search } from "lucide-react";
import React, { ChangeEvent, FC, useState } from "react";

interface SearchRoutineInputProps {
  onChange: (search: string) => void;
}

const SearchRoutineInput: FC<SearchRoutineInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="relative max-w-sm mx-auto">
      <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 ml-2 text-gray-500" />
      <TextInput
        className="pl-8 text-lgxl"
        placeholder="Search ..."
        value={value}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default SearchRoutineInput;
