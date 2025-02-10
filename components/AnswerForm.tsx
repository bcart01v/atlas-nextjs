"use client";

import React, { useState } from "react";
import { addAnswer } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface AnswerFormProps {
  questionId: string;
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const [answerText, setAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addAnswer({ answer: answerText, question_id: questionId });
      setAnswerText("");
      router.refresh();
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative my-7">
      <input type="hidden" name="question_id" value={questionId} className="hidden" />
      <textarea
        name="answer"
        placeholder="Your answer..."
        className="mt-1 block w-full rounded-md border border-atlas-white-300 bg-inherit py-0 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-3 focus:ring-atlas-teal"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        required
        rows={2}
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary"
      >
        {isSubmitting ? "Submitting..." : "Answer"}
      </button>
    </form>
  );
}