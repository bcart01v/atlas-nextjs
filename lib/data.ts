// lib/data.ts

import { sql } from "@vercel/postgres";
import { Question, Answer, Topic, User } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTopics(): Promise<Topic[]> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string): Promise<Topic | null> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchQuestions(topicId: string): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      SELECT * FROM questions 
      WHERE topic_id = ${topicId} 
      ORDER BY votes DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string): Promise<Question | null> {
  try {
    const data = await sql<Question>`
      SELECT * FROM questions WHERE id = ${id}
    `;
    return data.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch question.");
  }
}

export async function fetchAnswers(questionId: string): Promise<Answer[]> {
  try {
    const data = await sql<Answer>`
      SELECT * FROM answers 
      WHERE question_id = ${questionId}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch answers.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
): Promise<Question> {
  try {
    const data = await sql<Question>`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, ${question.votes})
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(
  topic: Pick<Topic, "title">
): Promise<{ id: string }> {
  try {
    const data = await sql<Topic>`
      INSERT INTO topics (title)
      VALUES (${topic.title})
      RETURNING id;
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string): Promise<Question> {
  try {
    const data = await sql<Question>`
      UPDATE questions 
      SET votes = votes + 1 
      WHERE id = ${id}
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function insertAnswer(
  answer: Pick<Answer, "answer" | "question_id">
): Promise<Answer> {
  try {
    const data = await sql<Answer>`
      INSERT INTO answers (answer, question_id)
      VALUES (${answer.answer}, ${answer.question_id})
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markQuestionAnswerAsAccepted(
  questionId: string,
  answerId: string
): Promise<Question> {
  try {
    const data = await sql<Question>`
      UPDATE questions
      SET answer_id = ${answerId}
      WHERE id = ${questionId}
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}