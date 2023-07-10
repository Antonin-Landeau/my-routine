import { Image } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { FC } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  label: string;
  selectedImage: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  selectedImage,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      {selectedImage && (
        <img
          src={`${selectedImage}`}
          alt="img"
          className="w-full mb-3 rounded-xl"
        />
      )}
      <CldUploadWidget
        uploadPreset="tt6sucum"
        onUpload={(result: any) => {
          onChange(result.info.secure_url);
        }}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }

          return (
            <button
              type="button"
              className="flex items-center p-2 w-fit text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleOnClick}
            >
              <Image className="w-4 h-4 mr-2" />
              Upload Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
