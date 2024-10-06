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
import { Label } from "./ui/label";
import { useTranslation } from "@/app/i18n/client";
import { generateSuggestions } from "@/actions/suggestions";

export function AiSuggestionTextarea({ data, lng, onChange, isExperince }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [textContent, setTextContent] = useState(data.summary);
  const [suggestions, setSuggestions] = useState([]);
  const { t } = useTranslation(lng, "forms");

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    if (!data.jobTitle) {
      setIsLoading(false);
      return;
    }
    try {
      const result = await generateSuggestions(
        isExperince,
        data.jobTitle,
        data.company,
      );
      setSuggestions(result);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [data.jobTitle]);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setTextContent(suggestion.text);
      setShowSuggestions(false);
      setSuggestions([]);
      onChange(suggestion.text);
    },
    [onChange],
  );

  const handleTextChange = useCallback(
    (e) => {
      const newText = e.target.value;
      setTextContent(newText);
      onChange(newText);
    },
    [onChange],
  );

  return (
    <div className="w-full ">
      <div className="relative">
        <Label htmlFor="summary" className="text-[#20133E]">
          {t("personalInfo.summary")}
        </Label>
        <Textarea
          id="summary"
          name="summary"
          value={textContent}
          onChange={handleTextChange}
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
              suggestions.length > 0 ? "w-full sm:w-[20%]" : "hidden w-0"
            }`}
            side="right"
            align="start"
            alignOffset={-40}
            sideOffset={5}
          >
            <h3 className="font-semibold mb-2">AI Suggestions</h3>
            <ul className="space-y-2">
              {suggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-50 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200"
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
