import { NextRequest, NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } },
): Promise<NextResponse> {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 },
      );
    }

    const answers = await fetchAnswers(params.id);

    return NextResponse.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 },
    );
  }
}