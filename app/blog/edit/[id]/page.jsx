"use client";
import React from "react";
import { useState, useRef } from "react";
import { CameraIcon, Loader } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
function EditPost() {
  const { register, handleSubmit, setError, reset } = useForm();
  const inputRef = useRef(null);
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleupload = () => {
    inputRef.current.click();
  };
  const param = useParams();
  const id = param?.id;
  return (
    <div>
      <Toaster />
      <form
        className="flex flex-col justify-center items-start p-4 gap-2 w-full"
        onSubmit={handleSubmit(async (data) => {
          setSubmitting(true);
          try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("description", data.description);
            if (selectedFile) {
              formData.append("image", selectedFile);
            }
            await axios.patch(`/api/post/${id}`, formData);
            reset();
            toast.success("Post edited successfully");
            router.push("/");
          } catch (error) {
            toast.error("An unexpected error occur");
            console.error("Error creating issue:", error);
            setError("Something went wrong!");
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <div className="mb-4 mt-10">
          <div className="">
            <h1 className="font-black text-3xl font-poppins">
              Edit <span className="pl-2">Post.</span>
            </h1>
          </div>
        </div>
        <div>
          <div
            className="flex items-center gap-2 rounded-xs p-3 w-fit text-sm bg-secondary-foreground cursor-pointer font-roboto font-medium"
            onClick={handleupload}
          >
            <CameraIcon />
            {selectedFile ? (
              <p>Selected: {selectedFile.name}</p>
            ) : (
              <p>Add Images</p>
            )}
          </div>
          <input
            type="file"
            name="image"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          className=" rounded-xs p-3 w-full text-sm bg-secondary-foreground"
          {...register("title")}
          required
        />
        <select
          className=" rounded-xs p-3 w-full text-sm bg-secondary-foreground"
          {...register("category")}
          required
        >
          <option value="" className="bg-black">
            Select category
          </option>
          <option value="Travel" className="bg-black">
            Travel
          </option>
          <option value="Lifestyle" className="bg-black">
            Lifestyle
          </option>
          <option value="Educational" className="bg-black">
            Educational
          </option>
          <option value="Sports" className="bg-black">
            Sports
          </option>
          <option value="Entertaiment" className="bg-black">
            Entertainment
          </option>
          <option value="Other" className="bg-black">
            Other
          </option>
        </select>

        <textarea
          placeholder="Description"
          className=" rounded-xs p-3 w-full text-sm bg-secondary-foreground h-36"
          {...register("description")}
          required
        />
        <button
          type="submit"
          className="flex justify-center items-center gap-1 text-white bg-accent p-2 px-4 rounded-sm text-sm font-medium font-roboto mt-2"
        >
          Edit Post
          {isSubmitting ? <Loader className="animate-spin stroke-2" /> : ""}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
