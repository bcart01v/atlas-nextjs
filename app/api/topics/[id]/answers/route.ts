import { NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const answers = await fetchAnswers(params.id);
    if (!answers || answers.length === 0) {
      return NextResponse.json({ error: "No answers found, check your parameters" }, { status: 404 });
    }
    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}