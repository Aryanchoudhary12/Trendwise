"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import tw from "@/public/tw.png";

function SignInForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 bg-secondary-foreground shadow-md rounded p-8 w-full max-w-sm">
        <div className="w-full flex justify-start items-center gap-1">
          <Image src={tw} alt="logo" className="h-12 w-12" />
          <div>
            <p className="text-white text-xl font-bold font-roboto">
              TREND<span className="text-muted">WISE</span>
            </p>
            <p className="text-sm font-roboto -mt-1">AI meets trends.</p>
          </div>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
