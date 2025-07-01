"use client";
import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import Image from "next/image";
import message from "../public/message.png"
import { MessageCircleX } from "lucide-react";
export default function PostsListClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("All");
  const FilteredPost = posts.filter((post) => {
    const filteredList = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      searchInput === "All" ||
      post.categories.some((cat) => cat.name === searchInput);
    return filteredList && matchCategory;
  });
  const category = [
    {
      name: "All",
    },
    {
      name: "Travel",
    },
    {
      name: "Lifestyle",
    },
    {
      name: "Educational",
    },
    {
      name: "Sports",
    },
    {
      name: "Entertainment",
    },
    {
      name: "Other",
    },
  ];

  return (
    <div className="">
      <form action="" className="flex justify-center gap-2 mt-10 ">
        <input
          type="text"
          className="p-3 bg-secondary-foreground text-sm rounded-sm w-60 outline-none "
          placeholder="Search for blogs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="p-3 text-sm rounded-sm bg-button" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-4 justify-center mt-4 px-2">
        {category.map((category) => {
          return (
            <div key={category.name} className="h-fit w-fit">
              <button
                className={`p-2 px-4 rounded-full ${
                  searchInput == category.name ? "bg-button" : "bg-button/50"
                }`}
                onClick={() => setSearchInput(category.name)}
              >
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="p-4 mt-2">
        <div className="flex justify-start items-center gap-2">
          <Image src={message} alt="" className="h-10 w-10"></Image>
          <div className="mb-2">
            <h1 className="font-bold text-3xl font-roboto">LATEST POSTS</h1>
            <hr className="border-2 w-28 border-primary rounded-md" />
          </div>
        </div>

        
          {FilteredPost && FilteredPost.length > 0
            ?
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {FilteredPost.map((post1) => {
                return (
                  <Card
                    key={post1.id}
                    id={post1.id}
                    image={post1.image}
                    title={post1.title}
                    description={post1.content}
                    category={post1.categories.map((cat) => cat.name).join("")}
                    time={new Date(post1.createdAt).toDateString()}
                  />
                );
              })}
            </div>
            : <div className="flex flex-col justify-center items-center w-full h-80 bg-primary/50 rounded-md mt-4">
                <MessageCircleX className="stroke-2 h-20 w-20"/>
                <h1 className="mt-4 text-lg font-medium">No post available</h1>
              </div>}
          
       
      </div>
    </div>
  );
}
