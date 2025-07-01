"use client";
import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import Image from "next/image";
import message from "../public/message.png";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import oops from "@/public/oops.jpg";
import { MessageCircleX, UserRoundXIcon } from "lucide-react";
import user from "@/public/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function PostsListClient({ posts, users }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("All");
  const rowperpage = 4;
  const totalPages1 = Math.ceil(posts.length / rowperpage);
  const totalPages2 = Math.ceil(users.length / rowperpage);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
  const startindex = currentPage * rowperpage;
  const startindex2 = currentPage2 * rowperpage;
  const endindex = Math.min(startindex + rowperpage, posts.length);
  const endindex2 = Math.min(startindex2 + rowperpage, users.length);
  const FilteredPost = posts.filter((post) => {
    const filteredList = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      searchInput === "All" || post.category === searchInput;
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
          <Image src={message} alt="" className="h-8 w-8"></Image>
          <div className="mb-2">
            <h1 className="font-bold text-2xl font-roboto">LATEST POSTS</h1>
            <hr className="border-2 w-28 border-primary rounded-md" />
          </div>
        </div>

        {FilteredPost && FilteredPost.length > 0 ? (
          <div>
            <div className="mt-4 flex flex-wrap gap-4">
              {FilteredPost.slice(startindex, endindex).map((post1) => {
                return (
                  <Card
                    key={post1.id}
                    id={post1.id}
                    image={post1.image}
                    title={post1.title.slice(0, 30)}
                    description={post1.content.slice(0, 150)}
                    published={post1?.published}
                    category={post1.category}
                    time={new Date(post1.createdAt).toDateString()}
                  />
                );
              })}
            </div>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 0
                        ? "pointer-events-none opacity-50 font-semibold text-slate-50"
                        : "text-slate-50 hover:bg-white hover:text-black"
                    }
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(0, prev - 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages1 }, (_, i) => (
                  <PaginationItem key={i}>
                    <button
                      className={`${
                        currentPage === i
                          ? "font-bold text-white px-2 bg-primary rounded-full"
                          : "text-slate-50 hover:bg-muted hover:text-black px-2 font-semibold rounded-full"
                      }`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage >= totalPages1 - 1
                        ? "pointer-events-none opacity-50 font-semibold text-slate-50"
                        : "text-slate-50 hover:bg-white hover:text-black"
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages1 - 1, prev + 1)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-80 bg-primary/50 rounded-md mt-4">
            <MessageCircleX className="stroke-2 h-20 w-20" />
            <h1 className="mt-4 text-lg font-medium">No post available</h1>
          </div>
        )}
        <div className="flex justify-start items-center gap-2 mt-4">
          <Image src={user} alt="" className="h-10 w-10"></Image>
          <div className="mb-1">
            <h1 className="font-bold text-2xl font-roboto">OUR USERS</h1>
            <hr className="border-2 w-28 border-primary rounded-md" />
          </div>
        </div>
        <div className="mt-4 mb-10">
          {users && users.length > 0 ? (
            <div>
              <div className="flex flex-wrap gap-4 mt-4">
                {users.slice(startindex2, endindex2).map((user) => {
                  return (
                    <div
                      className="flex justify-between items-center gap-4 w-fit bg-secondary-foreground p-3 rounded-md border-2 border-secondary/50"
                      key={user.name}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user?.image ?? undefined}
                          className="rounded-full animate-none"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-white font-roboto">
                        Username : {user?.name ?? undefined}
                        <br />
                        <span>Email : {user?.email}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem className="flex justify-center items-center gap-2">
                    <PaginationPrevious
                      className={
                        currentPage2 === 0
                          ? "pointer-events-none opacity-50 font-semibold text-slate-50"
                          : "text-slate-50 hover:bg-white hover:text-black"
                      }
                      onClick={() =>
                        setCurrentPage2((prev) => Math.max(0, prev - 1))
                      }
                    />
                    {Array.from({ length: totalPages2 }, (_, i) => (
                      <PaginationItem key={i}>
                        <button
                          className={`${
                            currentPage2 === i
                              ? "font-bold text-white px-2 bg-primary rounded-2xl"
                              : "text-slate-50 hover:bg-muted hover:text-black px-2 font-semibold rounded-2xl"
                          }`}
                          onClick={() => setCurrentPage2(i)}
                        >
                          {i + 1}
                        </button>
                      </PaginationItem>
                    ))}
                    <PaginationNext
                      className={
                        currentPage2 >= totalPages2 - 1
                          ? "pointer-events-none opacity-50 font-semibold text-slate-50"
                          : "text-slate-50 hover:bg-white hover:text-black"
                      }
                      onClick={() =>
                        setCurrentPage2((prev) =>
                          Math.min(totalPages2 - 1, prev + 1)
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-80 bg-primary/50 rounded-md">
              <UserRoundXIcon className="stroke-2 h-20 w-20" />
              <h1 className="mt-4 text-lg font-medium">No user available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
