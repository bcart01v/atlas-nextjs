"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/ui";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <button
          onClick={() => signIn("github", { 
            callbackUrl: "/ui",
            redirect: true
          })}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}