"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
// Define the prompts
const ExperiencePrompt = (jobTitle, company) =>
  `Generate 3 detailed suggestions for professional responsibilities and tasks for someone with the job title "${jobTitle}". Each suggestion should reflect key responsibilities, achievements, or common duties associated with this role in his last experince at ## ${company} talk as you are that person ## your Resbonse should be in the same language as the job title.`;

const AboutPrompt = (field) =>
  `Generate 3 suggestions for a summary (About) for a user's resume based on their job Title. The summary should be 4 lines long and in the same language as the Job Title. Job Title: ${JSON.stringify(
    field,
  )}`;

export async function generateSuggestions(
  field,
  isExperience = false,
  company,
) {
  if (!field) {
    return;
  }
  console.log(field, company);

  const prompt = isExperience
    ? ExperiencePrompt(field, company)
    : AboutPrompt(field);

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
      prompt,
    });

    return object.suggestions;
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return;
  }
}
