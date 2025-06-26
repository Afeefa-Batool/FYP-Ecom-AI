import { NextRequest, NextResponse } from "next/server";
import groq from "@/api/groqClient";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "llama-3.3-70b-versatile", // or your preferred model
  });

  const response = chatCompletion.choices[0]?.message?.content || "";
  return NextResponse.json({ response });
}
