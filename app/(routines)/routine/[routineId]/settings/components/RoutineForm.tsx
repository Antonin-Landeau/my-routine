"use client";

import { Button } from "@/components/ui/Buttons/Button";
import ImageUpload from "@/components/ui/Inputs/ImageUpload";
import TextArea from "@/components/ui/Inputs/TextArea";
import TextInput from "@/components/ui/Inputs/TextInput";
import { RoutineWithTasks } from "@/Types/Routine";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

interface RoutineFormProps {
  initialRoutine: RoutineWithTasks;
  routineId: string;
}

const RoutineForm: FC<RoutineFormProps> = ({ initialRoutine, routineId }) => {
  const router = useRouter();
  const [mainImg, setMainImg] = useState(initialRoutine.mainImg);
  const [title, setTitle] = useState(initialRoutine.title);
  const [description, setDescription] = useState(initialRoutine.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      description,
      mainImg,
    };
    try {
      const res = await axios.patch(`/api/routine/${routineId}`, formData);
      console.log(res);

      toast.success("Routine Updated");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.success("Somthing whent wrong during the deletion");
      setLoading(false);
    }
  };

  return (
    <form className="" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex gap-10 ">
        <div className="max-w-2xl flex flex-col gap-3">
          <ImageUpload
            label="Main Image"
            selectedImage={mainImg}
            onChange={(url) => setMainImg(url)}
          />
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <Button className="my-5">Save Changes</Button>
    </form>
  );
};

export default RoutineForm;
