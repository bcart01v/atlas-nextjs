import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const questions = await fetchQuestions(params.id);
    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "No questions found, check your parameters" }, { status: 404 });
    }
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}