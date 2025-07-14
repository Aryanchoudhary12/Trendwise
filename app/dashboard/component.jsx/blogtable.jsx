"use client";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash2, Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Blogtable({ posts }) {
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("All");
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const filteredPost = posts.filter((post) => {
    const searchedpost = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const filterPost = Filter === "All" || post.category === Filter;
    return searchedpost && filterPost;
  });
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <Toaster />
      <div className="flex flex-wrap  gap-4 w-fit">
        <form className="flex justify-center items-center p-1 rounded-md bg-secondary-foreground w-fit border-2 border-muted/10 active:outline-1 active:outline-muted/20">
          <input
            type="text"
            placeholder="Search post"
            className="text-sm p-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="p-2 rounded-md text-sm bg-button px-2">
            Search
          </button>
        </form>
        <select
          className="w-fit rounded-md p-3  text-sm bg-secondary-foreground border-2 border-muted/10"
          value={Filter}
          onChange={(e) => setFilter(e.target.value)}
          required
        >
          <option value="All" className="bg-black">
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
      </div>

      <table className="w-full bg-secondary-foreground rounded-sm ">
        <thead className="border-b-2 border-secondary/50 w-full ">
          <tr className="">
            <th className="pl-4 p-2 text-start font-medium font-poppins text-sm">Title</th>
            <th className="p-2 text-start font-medium font-poppins text-sm">Date</th>
            <th className="p-2 text-start font-medium font-poppins text-sm">
              Category
            </th>
            <th className="p-2 text-start font-medium font-poppins text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPost.map((unique) => {
            return (
              <tr className="border-t-2 border-muted/20" key={unique.id}>
                <td className="pl-4 p-2 text-start font-poppins text-sm font-medium hover:text-muted transition-colors">
                  <Link href={`/blog/${unique.id}`} > {unique.title.split(0, 100)}</Link>
                </td>
                <td className=" p-2 text-start text-muted font-roboto text-sm">
                  {new Date(unique.createdAt).toDateString()}
                </td>
                <td className=" p-2 text-start">
                  <span className="font-sans text-xs p-1 px-3 rounded-full bg-accent/80 text-purple-200">
                    {unique.category}
                  </span>
                </td>
                <td className=" p-2 text-start">
                  <div className="flex flex-wrap gap-2 w-fit">
                    <button
                      className="flex justify-center items-center gap-1 p-2 rounded-sm text-sm bg-button px-2"
                      onClick={() => router.push(`/blog/edit/${unique.id}`)}
                    >
                      <Pencil className="h-4 w-4 stroke-3" /> Edit
                    </button>
                    <button
                      className="flex justify-center items-center gap-1 p-2 rounded-sm text-sm bg-accent px-2"
                      onClick={async () => {
                        setSubmitting(true);
                        try {
                          await axios.delete(`/api/post/${unique.id}`);
                          toast.success("Post deleted successfully");
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Blogtable;
