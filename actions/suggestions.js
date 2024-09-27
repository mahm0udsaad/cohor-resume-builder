"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateSuggestions(jobTitle) {
  if (!jobTitle) {
    return;
  }
  try {
    const { object } = await generateObject({
      model: groq("llama-3.1-70b-versatile"),
      schema: z.object({
        suggestions: z.array(
          z.object({
            text: z.string(),
          }),
        ),
      }),
      prompt: `Generate 3 suggestions for a summary (About) for a user's resume based on their job Title. The summary should be 4 lines long return 
      the suggestions with the same language as the jobTitle. Job Title: ${JSON.stringify(
        jobTitle,
      )}`,
    });

    return object.suggestions;
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw error;
  }
}
