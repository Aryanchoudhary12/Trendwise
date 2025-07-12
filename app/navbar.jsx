"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogIn, LogOutIcon, MenuIcon, ChevronsRight } from "lucide-react";
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
              <p className="text-white text-lg font-bold font-roboto">
                TREND<span className="text-secondary">WISE</span>
              </p>
              <p className="text-xs font-roboto -mt-1">AI meets trends.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full w-full">
          <ul className="bg-secondary-foreground/80 flex flex-col items-start justify-center gap-x-4 w-full rounded-xs">
            <Link href="/" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full  rounded-xs cursor-pointer transition-colors hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                  currentpath === "/" ? " text-secondary" : " text-white"
                }`}
              >
                <ChevronsRight
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/" ? "stroke-secondary" : "stroke-white"
                  }`}
                />
                HOME
              </li>
            </Link>

            <Link href="/dashboard" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                  currentpath === "/dashboard"
                    ? " text-secondary "
                    : " text-white"
                }`}
              >
                <ChevronsRight
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/dashboard"
                      ? "stroke-secondary"
                      : "stroke-white"
                  }`}
                />
                DASHBOARD
              </li>
            </Link>
            <Link href="/new" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                  currentpath === "/new" ? " text-secondary " : " text-white"
                }`}
              >
                <ChevronsRight
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/new" ? "stroke-secondary" : "stroke-white"
                  }`}
                />
                POST BLOGS
              </li>
            </Link>
            {session ? (
              <ul
                className="w-full `flex items-center p-2 rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold"
                onClick={signOut}
              >
                <li className=" text-white flex gap-2 justify-start items-center">
                  <LogOutIcon className="h-4 w-4 stroke-3" />
                  SIGN OUT
                </li>
              </ul>
            ) : (
              <ul
                className="`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold"
                onClick={signIn}
              >
                <li className=" text-white flex gap-2 justify-start items-center">
                  <LogIn className="h-4 w-4 stroke-3" />
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
            <p className="text-white text-lg font-bold font-roboto">
              TREND<span className="text-secondary">WISE</span>
            </p>
            <p className="text-xs font-roboto -mt-1">AI meets trends.</p>
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
              <HoverCardContent>
               
                <div
                  className="flex justify-between items-center gap-4 w-fit bg-secondary-foreground p-3 rounded-xl px-6 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]"
                  key={session?.user?.name}
                >
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
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          {session ? (
            <button
              className="flex gap-1 p-2 rounded-full  bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 font-poppins w-32 justify-center items-center  text-sm"
              onClick={signOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="flex gap-1 p-2 rounded-full  bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 font-poppins w-32 justify-center items-center  text-sm"
              onClick={signIn}
            >
              Sign In
            </button>
          )}
          <Sheet className="md:hidden">
            <SheetTrigger className="md:hidden">
              <MenuIcon className="mr-4 p-1 h-8 w-8 bg-secondary/30 rounded-md stroke-secondary" />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  {" "}
                  <div className="flex items-center justify-center gap-2 pl-3 md:hidden">
                    <Image src={tw} alt="logo" className="h-8 w-8"></Image>
                    <div>
                      <p className="text-white text-lg font-bold font-roboto">
                        TREND<span className="text-secondary">WISE</span>
                      </p>
                      <p className="text-xs font-roboto -mt-1">
                        AI meets trends.
                      </p>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <span className="bg-secondary-foreground/80 flex flex-col items-start justify-center gap-x-4 w-full rounded-xs mt-6">
                    <Link href="/" passHref className="w-full">
                      <li
                        className={`flex items-center p-2 w-full  rounded-xs cursor-pointer transition-colors hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                          currentpath === "/"
                            ? " text-secondary"
                            : " text-white"
                        }`}
                      >
                        <ChevronsRight
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/"
                              ? "stroke-secondary"
                              : "stroke-white"
                          }`}
                        />
                        HOME
                      </li>
                    </Link>

                    <Link href="/dashboard" passHref className="w-full">
                      <li
                        className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                          currentpath === "/dashboard"
                            ? " text-secondary "
                            : " text-white"
                        }`}
                      >
                        <ChevronsRight
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/dashboard"
                              ? "stroke-secondary"
                              : "stroke-white"
                          }`}
                        />
                        DASHBOARD
                      </li>
                    </Link>
                    <Link href="/new" passHref className="w-full">
                      <li
                        className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                          currentpath === "/new"
                            ? " text-secondary "
                            : " text-white"
                        }`}
                      >
                        <ChevronsRight
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/new"
                              ? "stroke-secondary"
                              : "stroke-white"
                          }`}
                        />
                        POST BLOGS
                      </li>
                    </Link>
                    {session ? (
                      <span
                        className="w-full `flex items-center p-2 rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold"
                        onClick={signOut}
                      >
                        <li className=" text-white flex gap-2 justify-start items-center">
                          <LogOutIcon className="h-4 w-4 stroke-3" />
                          SIGN OUT
                        </li>
                      </span>
                    ) : (
                      <span
                        className="`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold"
                        onClick={signIn}
                      >
                        <li className=" text-white flex gap-2 justify-start items-center">
                          <LogIn className="h-4 w-4 stroke-3" />
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
