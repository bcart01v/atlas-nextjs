"use client";

import { useTransition } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { addVote } from "@/lib/actions";

export default function VoteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const upVote = async () => {
    const formData = new FormData();
    formData.append("id", id);

    startTransition(async () => {
      await addVote(formData);
    });
  };

  return (
    <button
      onClick={upVote}
      disabled={isPending}
      className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-hidden active:ring-2 active:ring-primary"
    >
      <HandThumbUpIcon />
    </button>
  );
}