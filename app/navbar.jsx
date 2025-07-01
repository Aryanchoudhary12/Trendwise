"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NotepadText,
  Home,
  LogIn,
  LogOutIcon,
  MenuIcon,
  MessageSquarePlusIcon,
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
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
                TREND<span className="text-muted">WISE</span>
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
                  currentpath === "/" ? " text-muted" : " text-white"
                }`}
              >
                <Home
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/" ? "stroke-muted" : "stroke-white"
                  }`}
                />
                HOME
              </li>
            </Link>

            <Link href="/dashboard" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                  currentpath === "/dashboard" ? " text-muted " : " text-white"
                }`}
              >
                <NotepadText
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/dashboard"
                      ? "stroke-muted"
                      : "stroke-white"
                  }`}
                />
                DASHBOARD
              </li>
            </Link>
            <Link href="/new" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full rounded-xs cursor-pointer hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                  currentpath === "/new" ? " text-muted " : " text-white"
                }`}
              >
                <MessageSquarePlusIcon
                  className={`h-4 w-4 stroke-3 ${
                    currentpath === "/new" ? "stroke-muted" : "stroke-white"
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
              TREND<span className="text-muted">WISE</span>
            </p>
            <p className="text-xs font-roboto -mt-1">AI meets trends.</p>
          </div>
        </div>
        <div className="flex gap-2 md:mr-4">
          {session && (
            <HoverCard>
              <HoverCardTrigger>
                <Avatar className="p-1 h-10 w-10 bg-muted/15">
                  <AvatarImage
                    src={session?.user?.image ?? undefined}
                    className="rounded-full animate-none"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session?.user?.image ?? undefined}
                      className="rounded-full animate-none"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-white font-roboto">
                    Username : {session?.user?.name ?? undefined}
                    <br />
                    <span>Email : {session?.user?.email}</span>
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}

          <Sheet className="md:hidden">
            <SheetTrigger className="md:hidden">
              <MenuIcon className="mr-4 p-1 h-8 w-8 border-2 border-secondary" />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  {" "}
                  <div className="flex items-center justify-center gap-2 pl-3 md:hidden">
                    <Image src={tw} alt="logo" className="h-8 w-8"></Image>
                    <div>
                      <p className="text-white text-lg font-bold font-roboto">
                        TREND<span className="text-muted">WISE</span>
                      </p>
                      <p className="text-xs font-roboto -mt-1">
                        AI meets trends.
                      </p>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <span className="bg-secondary-foreground/80 flex flex-col items-start justify-center gap-x-4 w-full rounded-xs">
                    <Link href="/" passHref className="w-full">
                      <li
                        className={`flex items-center p-2 w-full  rounded-xs cursor-pointer transition-colors hover:bg-secondary/40 text-sm font-roboto gap-1 font-semibold ${
                          currentpath === "/" ? " text-muted" : " text-white"
                        }`}
                      >
                        <Home
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/"
                              ? "stroke-muted"
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
                            ? " text-muted "
                            : " text-white"
                        }`}
                      >
                        <NotepadText
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/dashboard"
                              ? "stroke-muted"
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
                            ? " text-muted "
                            : " text-white"
                        }`}
                      >
                        <MessageSquarePlusIcon
                          className={`h-4 w-4 stroke-3 ${
                            currentpath === "/new"
                              ? "stroke-muted"
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
