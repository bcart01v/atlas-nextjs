"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      onClick={() => signIn("github")}
    >
      <div>Sign In with GitHub</div>
    </button>
  );
}