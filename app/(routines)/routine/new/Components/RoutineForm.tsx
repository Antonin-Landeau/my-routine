"use client";
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { CldUploadWidget } from "next-cloudinary";
import { Carousel, useCarousel } from "@/Components/Carousel/Carousel";
import { Image } from "lucide-react";
import TasksInput from "../../../../../Components/ui/Inputs/TasksInput";
import Headings from "@/Components/ui/Headings";
import TextInput from "@/Components/ui/Inputs/TextInput";
import TextArea from "@/Components/ui/Inputs/TextArea";
import ImageUpload from "@/Components/ui/Inputs/ImageUpload";
import { RoutineFormData, Task } from "@/Types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
interface RoutineFormProps {}

const RoutineForm: FC<RoutineFormProps> = ({}) => {
  const { index, nextIndex, prevIndex } = useCarousel();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescritpion] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const removeTask = (index: number) => {
    setTasks((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: RoutineFormData = {
      title,
      description,
      mainImg: selectedImage,
      tasks,
    };
    try {
      const res = await axios.post("/api/routine", formData);
      router.push(`/routine/${res.data.id}`);
      toast.success("Routine has been created");
    } catch (error) {}
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="max-w-lg mx-auto">
      <Headings
        title="Create your routine"
        description="Create your routine with task to improove your life"
      />
      <Carousel index={index} nextIndex={nextIndex} prevIndex={prevIndex}>
        <div className="min-w-full p-5 flex flex-col gap-3">
          <ImageUpload
            selectedImage={selectedImage}
            label="Main Image"
            onChange={(url) => setSelectedImage(url)}
          />

          <TextInput
            label="Title"
            name="name"
            placeholder="Your routine title"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextArea
            label="Descritpion"
            placeholder="Your routine description"
            rows={4}
            onChange={(e) => setDescritpion(e.target.value)}
          />
        </div>
        <div className="min-w-full p-5">
          <TasksInput
            tasks={tasks}
            onChange={(task) => setTasks((prev) => [...prev, task])}
            onDelete={(index) => removeTask(+index)}
          />
        </div>
      </Carousel>
      <div className="p-5 flex justify-between">
        {index === 0 && (
          <button
            type="button"
            className="py-2.5 ml-auto px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={nextIndex}
          >
            Next
          </button>
        )}
        {index === 1 && (
          <>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={prevIndex}
            >
              Previous
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create Routine
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default RoutineForm;
