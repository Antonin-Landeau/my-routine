import React, { FC } from "react";

interface SubHeadingProps {
  label: string;
}

const SubHeading: FC<SubHeadingProps> = ({ label }) => {
  return <h3 className="text-2xl font-medium border-b pb-3 mb-5">{label}</h3>;
};

export default SubHeading;
