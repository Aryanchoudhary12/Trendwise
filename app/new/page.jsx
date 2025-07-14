"use client";
import React from "react";
import { useState, useRef } from "react";
import { CameraIcon, Loader, Sparkles } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import message from "../../public/addition.png";
function New() {
  const {
    register: registerManual,
    handleSubmit: handleManualSubmit,
    reset: resetManual,
    setError: setManualError,
  } = useForm();
  const {
    register: registerGenerated,
    handleSubmit: handleGeneratedSubmit,
    reset: resetGenerated,
  } = useForm();
  const inputRef = useRef(null);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitting2, setSubmitting2] = useState(false);
  const handleupload = () => {
    inputRef.current.click();
  };
  const onGenerate = async (data) => {
    setSubmitting2(true);
    try {
      const response = await axios.post("/api/new/generate", {
        title: data.title,
        category: data.category,
      });

      toast.success("Blog generated successfully!");
      resetGenerated();
      console.log("Generated post:", response.data);
    } catch (error) {
      toast.error("Failed to generate blog post");
      console.error(error);
    } finally {
      setSubmitting2(false);
    }
  };
  return (
    <div>
      <Toaster />
      <form
        className="flex flex-col justify-center items-start p-4 gap-2 w-full sm:w-11/12 md:w-10/12 lg:w-9/12"
        onSubmit={handleManualSubmit(async (data) => {
          setSubmitting(true);
          try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("description", data.description);
            formData.append("image", selectedFile);
            await axios.post("/api/new", formData);
            toast.success("Posted successfully");
            resetManual();
            router.refresh();
          } catch (error) {
            toast.error("An unexpected error occur");
            console.error("Error creating issue:", error);
            setManualError("Something went wrong!");
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <div className="mb-4 mt-10">
          <div className="flex justify-start items-center gap-3">
            <div className="flex gap-2 items-center">
              <Image src={message} alt="" className="h-5 w-5"></Image>
              <div className="">
                <h1 className="font-bold text-xl font-poppins">
                  Create New <span className="">Post.</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex items-center gap-2 rounded-md p-3 w-fit text-sm bg-secondary-foreground cursor-pointer font-sans font-medium border-2 border-muted/10"
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
          className=" rounded-md p-3 w-full text-sm bg-secondary-foreground border-2 border-muted/10"
          {...registerManual("title")}
          required
        />
        <select
          className=" rounded-md p-3 w-full text-sm bg-secondary-foreground border-2 border-muted/10"
          {...registerManual("category")}
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
          className=" rounded-md p-3 w-full text-sm bg-secondary-foreground h-36 border-2 border-muted/10"
          {...registerManual("description")}
          required
        />
        <button
          type="submit"
          className="flex justify-center items-center gap-1 bg-accent p-2 px-4 rounded-sm text-sm font-medium font-roboto mt-2 text-white"
        >
          Submit Post{" "}
          {isSubmitting ? <Loader className="animate-spin stroke-2" /> : ""}
        </button>
      </form>
      <div className="flex justify-start items-center gap-2 p-4">
        <Image src={message} alt="" className="h-5 w-5"></Image>
        <div className="">
          <h1 className="font-bold text-xl font-poppins">
            Generate <span className="pl-1">Post.</span>
          </h1>
        </div>
      </div>
      <form
        onSubmit={handleGeneratedSubmit(onGenerate)}
        className="flex flex-col gap-2 p-4 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 "
      >
        <input
          type="text"
          placeholder="Title"
          className=" rounded-md p-3 w-full text-sm bg-secondary-foreground border-2 border-muted/10"
          {...registerGenerated("title")}
          required
        />
        <select
          className=" rounded-md p-3 w-full text-sm bg-secondary-foreground border-2 border-muted/10"
          {...registerGenerated("category")}
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
        <button
          type="submit"
          className="flex w-fit justify-center items-center gap-1 bg-blue-500 p-2 px-4 rounded-sm text-base font-medium font-roboto mt-2"
        >
          <Sparkles className="h-4 w-4" /> Generate Post{" "}
          {isSubmitting2 ? <Loader className="animate-spin stroke-2" /> : ""}
        </button>
      </form>
    </div>
  );
}

export default New;
