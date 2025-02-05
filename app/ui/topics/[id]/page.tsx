import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchQuestions, fetchTopic } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const topic = await fetchTopic(resolvedParams.id);
  const questions = await fetchQuestions(resolvedParams.id);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {topic.title}
      </h1>
      <AskQuestion topic={topic.id} />
      {questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          text={question.title}
          votes={question.votes}
        />
      ))}
    </div>
  );
}