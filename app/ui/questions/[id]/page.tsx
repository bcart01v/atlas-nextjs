import { fetchQuestion, fetchAnswers } from "@/lib/data";
import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";
import { HashtagIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: { id: string };
}

export default async function QuestionPage({ params }: PageProps) {
  const questionId = params.id;
  const question = await fetchQuestion(questionId);
  const answers = await fetchAnswers(questionId);

  if (!question) {
    return <div className="text-center text-gray-600 text-xl mt-10">Question not found</div>;
  }

  const sortedAnswers = answers.sort((a, b) => {
    if (question.answer_id === a.id) return -1;
    if (question.answer_id === b.id) return 1;
    return 0;
  });

  return (
    <div className="mx-auto p-6">
      {/* Question Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center mb-4">
      <HashtagIcon className="h-6 w-6 mr-2" /> {question.title}
      </h1>

      {/* Answer Form */}
      <AnswerForm questionId={questionId} />

      {/* Answers List */}
      <div className="mt-6 space-y-2">
        {sortedAnswers.map((answer) => (
          <AnswerItem
            key={answer.id}
            answer={answer}
            questionId={questionId}
            accepted={question.answer_id === answer.id}
          />
        ))}
      </div>
    </div>
  );
}