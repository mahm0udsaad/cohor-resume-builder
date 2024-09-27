"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { Label } from "./ui/label";
import { useTranslation } from "@/app/i18n/client";
import { generateObject } from "ai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export function AiSuggestionTextarea({ data, lng }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { t } = useTranslation(lng, "forms");
  const handleClick = useCallback(async () => {
    setIsLoading(true);
    console.log(data);

    try {
      // Generate suggestions using the AI model and a Zod schema
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
          data.jobTitle,
        )}`,
      });

      // Set suggestions from the response
      setSuggestions(object.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setTextContent(suggestion.text);
    setShowSuggestions(false);
    setSuggestions([]);
  }, []);

  return (
    <div className="w-full ">
      <div className="relative">
        <Label htmlFor="summary" className="text-[#20133E]">
          {t("personalInfo.summary")}{" "}
          {/* Translation for "Professional Summary" */}
        </Label>
        <Textarea
          id="summary"
          name="summary"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Enter your text here..."
          rows={4}
          className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
        />
        <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
          <PopoverTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={isLoading}
              size="icon"
              className="absolute right-2 bottom-2 bg-[#3B51A3] hover:bg-white hover:text-black"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              <span className="sr-only">Generate with AI</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={`${
              suggestions.length === 0 ? "hidden w-0" : ""
            } w-[20%]`}
            side="right"
            align="start"
            alignOffset={-40}
            sideOffset={5}
          >
            <h3 className="font-semibold mb-2">AI Suggestions</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
