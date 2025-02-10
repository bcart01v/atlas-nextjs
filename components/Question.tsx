"use client";
import Link from "next/link";
import VoteButton from "./VoteButton";

type QuestionProps = {
  id: string;
  text: string;
  votes: number;
};

export function Question({ id, text, votes }: QuestionProps) {
  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center border-l border-r border-t border-gray-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
      <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
        {votes}
      </div>
      <Link href={`/ui/questions/${id}`} className="text w-full text-left font-semibold flex-grow hover:bg-gray-100 p-2">
        {text}
      </Link>
      <div onClick={handleVoteClick}>
        <VoteButton id={id} />
      </div>
    </div>
  );
}