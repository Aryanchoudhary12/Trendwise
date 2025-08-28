"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHouseChimney } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { LogIn, LogOutIcon, MenuIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import tw from "@/public/tw.png";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { data: session } = useSession();
  console.log(session?.user?.id);
  const currentpath = isMounted ? pathname : "";
  return (
    <nav className="flex flex-col z-50">
      <div className="md:flex flex-col h-screen border-r-2 border-secondary-foreground w-48  gap-10 hidden p-2 fixed bg-background z-50">
        <div className="flex">
          <div className="h-16 w-full flex justify-center items-center gap-1">
            <Image src={tw} alt="logo" className="h-8 w-8"></Image>
            <div>
              <p className="text-white text-base font-bold font-poppins">
                TREND<span className="text-white">WISE</span>
              </p>
              <p className="text-xs font-poppins -mt-1">AI meets trends.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full w-full">
          <ul className="bg-secondary-foreground/80 flex flex-col items-start justify-center gap-x-4 w-full rounded-md">
            <Link href="/" passHref className="w-full">
              <li
                className={`flex items-center p-3 w-full  rounded-xs cursor-pointer transition-colors hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                  currentpath === "/"
                    ? " text-white bg-button border-r-4 border-r-secondary"
                    : " text-primary"
                }`}
              >
                <FaHouseChimney
                  className={`size-3.5  ${
                    currentpath === "/" ? "fill-white" : "fill-primary"
                  }`}
                />
                HOME
              </li>
            </Link>

            <Link href="/dashboard" passHref className="w-full">
              <li
                className={`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                  currentpath === "/dashboard"
                    ? " text-white bg-button border-r-4 border-r-secondary"
                    : " text-primary"
                }`}
              >
                <MdSpaceDashboard
                  className={`size-3.5  ${
                    currentpath === "/dashboard"
                      ? "fill-white"
                      : "fill-primary"
                  }`}
                />
                DASHBOARD
              </li>
            </Link>
            <Link href="/new" passHref className="w-full">
              <li
                className={`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                  currentpath === "/new"
                    ? " text-white bg-button border-r-4 border-r-secondary"
                    : " text-primary"
                }`}
              >
                <MdLibraryAdd
                  className={`size-3.5  ${
                    currentpath === "/new" ? "fill-white" : "fill-primary"
                  }`}
                />
                POST BLOGS
              </li>
            </Link>
            {session ? (
              <ul
                className="w-full `flex items-center p-3 rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium"
                onClick={signOut}
              >
                <li className=" text-primary flex gap-2 justify-start items-center">
                  <LogOutIcon className="size-3.5 stroke-3" />
                  SIGN OUT
                </li>
              </ul>
            ) : (
              <ul
                className="`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium"
                onClick={signIn}
              >
                <li className=" text-primary flex gap-2 justify-start items-center">
                  <LogIn className="size-3.5 stroke-3" />
                  SIGN IN
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
      <div className=" flex h-16 w-full border-b-2 border-secondary-foreground bg-background justify-between  items-center md:justify-end fixed z-20">
        <div className="flex items-center justify-center gap-2 pl-3 md:hidden">
          <Image src={tw} alt="logo" className="h-8 w-8"></Image>
          <div>
            <p className="text-white text-base font-bold font-poppins">
              TREND<span className="text-white">WISE</span>
            </p>
            <p className="text-xs font-poppins -mt-1">AI meets trends.</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:mr-4">
          {session && (
            <HoverCard>
              <HoverCardTrigger>
                <Avatar className="p-1 h-10 w-10 bg-secondary/15">
                  <AvatarImage
                    src={session?.user?.image ?? undefined}
                    className="rounded-full animate-none"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="flex justify-between items-center gap-4 w-fit bg-secondary-foreground p-3 rounded-xl px-6 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={session?.user?.image ?? undefined}
                    className="rounded-full animate-none"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start">
                  <p className="text-white font-poppins font-medium text-base">
                    {session?.user?.name ?? undefined}
                  </p>
                  <span className="text-xs ">{session?.user?.email}</span>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          {session ? (
            <button
              className="bg-background no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-medium leading-6  text-white inline-block"
              onClick={signOut}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-secondary-foreground py-2 px-4 ring-1 ring-white/10 ">
                <span>{`Sign Out`}</span>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          ) : (
            <button
              className="bg-background no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-medium leading-6  text-white inline-block"
              onClick={signIn}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-secondary-foreground py-2 px-4 ring-1 ring-white/10 ">
                <span>{`Sign In`}</span>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          )}
          <Sheet className="md:hidden border-background">
            <SheetTrigger className="md:hidden">
              <MenuIcon className="mr-4 p-1 h-9 w-9  l stroke-primary " />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  {" "}
                  <div className="flex items-center justify-center gap-2 pl-3 md:hidden">
                    <Image src={tw} alt="logo" className="h-8 w-8"></Image>
                    <div>
                      <p className="text-white text-base font-bold font-poppins">
                        TREND<span className="text-white">WISE</span>
                      </p>
                      <p className="text-xs font-poppins -mt-1">
                        AI meets trends.
                      </p>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <span className="bg-secondary-foreground/80 flex flex-col items-start justify-center gap-x-4 w-full rounded-xs mt-6">
                    <Link href="/" passHref className="w-full">
                      <li
                        className={`flex items-center p-3 w-full  rounded-xs cursor-pointer transition-colors hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                          currentpath === "/"
                            ? " text-white bg-button border-r-4 border-r-secondary"
                            : " text-primary"
                        }`}
                      >
                        <FaHouseChimney
                          className={`size-3.5 stroke-3 ${
                            currentpath === "/"
                              ? "stroke-primary"
                              : "stroke-white"
                          }`}
                        />
                        HOME
                      </li>
                    </Link>

                    <Link href="/dashboard" passHref className="w-full">
                      <li
                        className={`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                          currentpath === "/dashboard"
                            ? " text-white bg-button border-r-4 border-r-secondary"
                            : " text-primary"
                        }`}
                      >
                        <MdSpaceDashboard
                          className={`size-3.5  ${
                            currentpath === "/dashboard"
                              ? "fill-white"
                              : "fill-primary"
                          }`}
                        />
                        DASHBOARD
                      </li>
                    </Link>
                    <Link href="/new" passHref className="w-full">
                      <li
                        className={`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium ${
                          currentpath === "/new"
                            ? " text-white bg-button border-r-4 border-r-secondary"
                            : " text-primary"
                        }`}
                      >
                        <MdLibraryAdd
                          className={`size-3.5  ${
                            currentpath === "/new"
                              ? "fill-white"
                              : "fill-primary"
                          }`}
                        />
                        POST BLOGS
                      </li>
                    </Link>
                    {session ? (
                      <span
                        className="w-full `flex items-center p-3 rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium"
                        onClick={signOut}
                      >
                        <li className=" text-primary flex gap-2 justify-start items-center">
                          <LogOutIcon className="size-3.5 stroke-3" />
                          SIGN OUT
                        </li>
                      </span>
                    ) : (
                      <span
                        className="`flex items-center p-3 w-full rounded-xs cursor-pointer hover:bg-muted-foreground text-sm font-poppins gap-1 font-medium"
                        onClick={signIn}
                      >
                        <li className=" text-primary flex gap-2 justify-start items-center">
                          <LogIn className="size-3.5 stroke-3" />
                          SIGN IN
                        </li>
                      </span>
                    )}
                  </span>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
