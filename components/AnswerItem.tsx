"use client";

import React, { useState } from "react";
import { markAnswerAsAccepted } from "@/lib/actions";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface AnswerItemProps {
  answer: {
    id: string;
    answer: string;
  };
  questionId: string;
  accepted: boolean;
}

export default function AnswerItem({ answer, questionId, accepted }: AnswerItemProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await markAnswerAsAccepted({ questionId, answerId: answer.id });
      router.refresh();
    } catch (error) {
      console.error("Error marking answer as accepted:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm 
        ${accepted ? "border-teal-500 bg-teal-50" : "hover:bg-gray-100 cursor-pointer"}
      `}
    >
      <p className="text-gray-800">{answer.answer}</p>

      <button
        onClick={handleAccept}
        disabled={accepted || isSubmitting}
        className={`h-8 w-8 flex items-center justify-center rounded-full 
          ${accepted ? "bg-teal-500 text-white" : "border border-gray-400 text-gray-600 hover:bg-gray-200"}
        `}
      >
        <CheckBadgeIcon className="h-5 w-5" />
      </button>
    </div>
  );
}