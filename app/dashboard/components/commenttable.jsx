"use client";
import React from "react";
import { useState } from "react";
import { Trash2, Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
function Commenttable({ comments }) {
  const [search, setSearch] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const filteredcomment = comments.filter((comment) => {
    const searchedcomment = comment?.author?.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return searchedcomment;
  });
  return (
    <div className="flex flex-col gap-2 p-2">
      <Toaster />
      <form className="flex justify-center items-center p-0.5 rounded-lg bg-secondary-foreground w-fit border-2 border-muted/10">
        <input
          type="text"
          placeholder="Search comment by author"
          className="text-sm p-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 rounded-md text-sm bg-button px-2">
          Search
        </button>
      </form>

      <table className="w-full bg-secondary-foreground rounded-sm mt-2">
        <thead className="border-b-2 border-secondary/50 w-full">
          <tr className="">
            <th className="pl-4 p-2 text-start font-medium font-poppins text-sm">
              Comment & Post
            </th>
            <th className="p-2 text-start font-medium font-poppins text-sm">Date</th>
            <th className="p-2 text-start font-medium font-poppins text-sm">Author</th>
            <th className="p-2 text-start font-poppins text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredcomment.map((unique) => {
            return (
              <tr className="border-t-2 border-muted/20" key={unique.id}>
                <td className="pl-4 p-2 text-start font-poppins">
                  <p>{unique?.content}</p>
                  <span className="text-xs text-white/80">
                    <span className="font-semibold text-muted">Post</span> :{" "}
                    {unique?.post?.title.split(0, 50)}
                  </span>
                </td>
                <td className=" p-2 text-start text-muted font-roboto text-sm">
                  {new Date(unique.createdAt).toDateString()}
                </td>
                <td className=" p-2 text-start font-roboto teext-sm">
                  {unique?.author?.name}
                </td>
                <td className=" p-2 text-start">
                  <button
                    className="flex justify-center items-center gap-1 p-2 rounded-sm text-sm bg-red-500 px-2"
                    onClick={async () => {
                      setSubmitting(true);
                      try {
                        await axios.delete(`/api/comment/${unique.id}`);
                        toast.success("Comment deleted successfully");
                        router.refresh();
                      } catch (error) {
                        toast.error("An internal error occured");
                        console.log("Something went wrong", error);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 stroke-3" />
                    Delete
                    {isSubmitting ? (
                      <Loader className="animate-spin h-4 w-4 stroke-3 ml-2" />
                    ) : (
                      ""
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Commenttable;
