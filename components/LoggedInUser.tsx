"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function LoggedInUser() {
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    console.log("Session Data:", session);
  }, [session]);

  if (!user) return null;

  return (
    <div className="p-0 space-y-3">
      <div className="flex items-center space-x-3 p-3 rounded-md bg-gray-100">
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-400"></div>
        )}
        <span className="text-lg font-medium">{user.name || "User"}</span>
      </div>
    </div>
  );
}