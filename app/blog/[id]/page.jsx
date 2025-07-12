"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast, { Toaster } from "react-hot-toast";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
function PostDetails() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params?.id;
  const fetchPost = async () => {
    const response = await axios.get(`/api/post/${id}`);
    setData(response.data);
  };
  useEffect(() => {
    fetchPost();
  }, [id]);

  const authorID = data?.authorId;
  console.log(data);
  if (!id)
    return NextResponse.json({ error: "No post available" }, { status: 500 });
  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster />
      <p className="mt-10 text-base font-roboto text-muted">
        <span className="font-poppins font-medium text-secondary">
          Published on :{" "}
        </span>
        {new Date(data.createdAt).toDateString()}
      </p>
      <h1 className="font-roboto text-5xl font-medium w-11/12 text-center">
        {data?.title ?? "Loading ..."}
      </h1>
      {data.published == true ? (
        <p className="mt-4 font-poppins ">
          <span className="font-semibold text-secondary">Author :</span>{" "}
          {data?.author?.name ?? "loading..."}
        </p>
      ) : (
        <div className="flex gap-2 items-center justify-center font-poppins mt-4 font-medium">
          <span className="font-semibold text-secondary">Author :</span>
          <div className="flex justify-center items-center gap-1"><Sparkles className="h-5 w-5" /> Groq AI</div>
        </div>
      )}
      {data?.image ? (
        <Image
          src={data?.image}
          alt="post image"
          width={200}
          height={200}
          className="h-full w-10/12 object-contain mt-4 rounded-md"
        ></Image>
      ) : (
        <Loader className="mt-4 h-10 w-10 stroke-muted animate-spin" />
      )}
      <p className="mt-4 p-2 px-4 rounded-full font-poppins bg-muted/90">
        {data?.category ?? "loading..."}
      </p>
      <p className="mt-4 font-poppins w-11/12 text-center">{data.content}</p>

      <div className="mt-10 mb-10 w-full p-4">
        <p className="w-full font-medium font-poppins ">
          Comments({data?.comments?.length ?? 0})
        </p>
        <hr className="mt-2 h-0 border-1 rounded-full border-primary" />
        <form
          className="flex w-full p-1 bg-secondary-foreground mt-2 rounded-sm"
          onSubmit={handleSubmit(async (data) => {
            try {
              if (!session) {
                toast.error("Unauthorized user. Signin please");
              }
              const formData = new FormData();
              formData.append("content", data.content);
              formData.append("authorId", authorID);
              await axios.post(`/api/post/${id}`, formData);
              reset();
              await fetchPost();
              toast.success("Comment added sucessfully");
            } catch (error) {
              console.error(error);
              toast.error("An internal error occured");
            }
          })}
        >
          <input
            type="text"
            autoComplete="off"
            className="p-3 text-sm w-full outline-none"
            placeholder="Write your comments here.."
            {...register("content")}
            required
          />
          <button className="p-2 px-3 bg-button rounded-sm">Submit</button>
        </form>
        <div className="grid grid-cols-1 gap-2 mt-4">
          {data?.comments?.map((comment) => {
            return (
              <div
                key={comment.id}
                className="p-2 px-4 bg-secondary-foreground rounded-sm"
              >
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={comment?.author?.image}
                      height={12}
                      width={12}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {comment?.author?.name}
                    </p>
                    <p className="font-roboto text-xs text-muted -mt-1">
                      {new Date(comment?.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-1 font-poppins pl-10">{comment?.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
