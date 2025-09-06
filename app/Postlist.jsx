"use client";
import { useState } from "react";
import Card from "@/components/ui/card";
import { FaThLarge } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { BsCupHotFill } from "react-icons/bs";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdSportsBasketball } from "react-icons/md";
import { MdMovieFilter } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserRoundXIcon } from "lucide-react";
import noPost from "@/public/NoPost.png";
import Image from "next/image";
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
      icon: <FaThLarge className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Travel",
      icon: <FaPlane className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Lifestyle",
      icon: <BsCupHotFill className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Educational",
      icon: <FaBookOpenReader className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Sports",
      icon: <MdSportsBasketball className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Entertainment",
      icon: <MdMovieFilter className="h-12 w-12 fill-primary" />,
    },
    {
      name: "Other",
      icon: <FaBoxOpen className="h-12 w-12 fill-primary" />,
    },
  ];

  return (
    <div className="">
      <form action="" className="flex justify-center gap-2 mt-10 ">
        <input
          type="text"
          className="p-3 px-4 bg-secondary-foreground border border-muted/10 text-sm rounded-sm w-56 md:w-80 outline-none "
          placeholder="Search for blogs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="p-3 px-4 font-poppins  text-sm rounded-sm font-medium bg-button"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-4 justify-center mt-10 px-2">
        {category.map((category) => {
          return (
            <div key={category.name} className="h-fit w-fit">
              <button
                className={`flex flex-col items-center justify-center p-4 gap-2 rounded-md bg-secondary-foreground text-sm h-20 w-28 ${
                  searchInput == category.name
                    ? "border-2 border-muted bg-gradient-to-br from-muted/20 via-transparent to-muted/10"
                    : ""
                }`}
                onClick={() => setSearchInput(category.name)}
              >
                {category.icon}
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="p-4 mt-2">
        <div className="flex justify-start items-center gap-2">
          <div className="mb-2">
            <h1 className="font-black text-3xl font-poppins uppercase">
              Latest <span className="pl-2">Posts</span>
            </h1>
            <p className=" font-poppins text-sm text-gray-300">
              Browse all latest posts created our users including articles,
              updates, and more.
            </p>
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
                    author={post1.author.name}
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
                          ? "font-bold text-white px-2 bg-button rounded-full"
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
          <div className="flex flex-col justify-center items-center w-full h-80 bg-secondary-foreground rounded-2xl mt-4 gap-1">
            <Image
              src={noPost}
              height={400}
              width={400}
              alt="no post"
              className="h-30 w-fit"
            ></Image>
            <h1 className="text-2xl font-bold font-poppins">
              No post available
            </h1>
            <span className="text-sm font-poppins font-medium text-primary">
              {" "}
              Be the first to upload and share your thoughts
            </span>
          </div>
        )}
        <div className="flex justify-start items-center gap-2 mt-4">
          <div className="mb-1">
            <h1 className="font-black text-3xl font-poppins uppercase">
              Our <span className="pl-2">Users</span>
            </h1>
            <p className=" font-poppins text-sm text-gray-300">
              Browse all our current users.
            </p>
          </div>
        </div>
        <div className="mt-4 mb-10">
          {users && users.length > 0 ? (
            <div>
              <div className="flex flex-wrap gap-4 mt-4">
                {users.slice(startindex2, endindex2).map((user) => {
                  return (
                    <div
                      className="flex justify-start items-center gap-4 w-fit bg-secondary-foreground p-3 rounded-lg px-6 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] min-w-80"
                      key={user.name}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user?.image ?? undefined}
                          className="rounded-full animate-none"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-white font-poppins font-medium text-base">
                          {user?.name ?? undefined}
                        </p>
                        <span className="text-xs ">{user?.email}</span>
                      </div>
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
                              ? "font-bold text-white px-2 bg-button rounded-2xl"
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
            <div className="flex flex-col justify-center items-center w-full h-80 bg-secondary-foreground rounded-2xl mt-4 gap-1">
              <Image
                src={noPost}
                height={400}
                width={400}
                alt="no post"
                className="h-30 w-fit"
              ></Image>
              <h1 className="text-2xl font-bold font-poppins">
                No user available
              </h1>
              <span className="text-sm font-poppins font-medium text-primary w-md">
                {" "}
                Sign in to become our first member of our team and expand our community.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
