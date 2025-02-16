"use server";

import { google } from "@ai-sdk/google";
import { z } from "zod";
import { generateObject } from "ai";
// Define the prompts with context
const ExperiencePrompt = (jobTitle, company, context) =>
  `Generate 3 detailed suggestions for professional responsibilities and tasks for someone with the job title "${jobTitle}". 
   Consider this additional context: ${context}
   Each suggestion should reflect key responsibilities, achievements, or common duties associated with this role in their experience at ${company}. 
   Talk as if you are that person. Your response should be in the same language as the job title.`;

const AboutPrompt = (field, context) =>
  `Generate 3 suggestions for a summary (About) for a user's resume based on their job Title: ${JSON.stringify(
    field,
  )}.
   Consider this additional context provided by the user: ${context}
   The summary should be 4 lines long and in the same language as the Job Title.`;

export async function generateSuggestions(
  isExperience = false,
  field,
  company,
  context = "",
) {
  if (!field) {
    return;
  }

  const prompt = isExperience
    ? ExperiencePrompt(field, company, context)
    : AboutPrompt(field, context);

  try {
    const { object } = await generateObject({
      model: google("gemini-1.5-flash-002"),
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
