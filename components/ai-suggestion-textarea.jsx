import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { Label } from "./ui/label";
import { useTranslation } from "@/app/i18n/client";
import { cn } from "@/lib/utils";
import { generateSuggestions } from "@/actions/suggestions";
export function AiSuggestionTextarea({
  plan,
  data,
  lng,
  jobTitle,
  onChange,
  isExperince = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [currentView, setCurrentView] = useState("context");
  const [textContent, setTextContent] = useState(data || "");
  const [contextInput, setContextInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { t } = useTranslation(lng, "forms");

  const handleContextSubmit = useCallback(async () => {
    if (!jobTitle) return;

    setIsLoading(true);
    setCurrentView("loading");

    try {
      const result = await generateSuggestions(
        isExperince,
        jobTitle,
        data?.company,
        contextInput,
      );
      setSuggestions(result);
      setCurrentView("suggestions");
    } catch (error) {
      console.error("Error generating suggestions:", error);
      setCurrentView("context");
    } finally {
      setIsLoading(false);
    }
  }, [jobTitle, contextInput, isExperince, data?.company]);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setTextContent(suggestion.text);
      setShowPopover(false);
      setSuggestions([]);
      onChange(suggestion.text);
      setCurrentView("context");
      setContextInput("");
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

  const renderPopoverContent = () => {
    switch (currentView) {
      case "context":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">
                {t("aiSuggestion.contextTitle")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("aiSuggestion.contextDescription")}
              </p>
            </div>
            <Textarea
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              placeholder={t("aiSuggestion.contextPlaceholder")}
              rows={4}
              className="w-full resize-none"
            />
            <div className="flex  gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPopover(false)}
                className="text-sm"
              >
                {t("aiSuggestion.cancelButton")}
              </Button>
              <Button
                size="sm"
                onClick={handleContextSubmit}
                className="bg-[#3B51A3] hover:bg-[#2C3E8C] text-sm"
              >
                {t("aiSuggestion.generateButton")}
              </Button>
            </div>
          </div>
        );

      case "loading":
        return (
          <div className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-t-[#3B51A3] animate-spin" />
                <Wand2 className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 text-center">
                {t("aiSuggestion.loadingText")}
              </p>
            </div>
          </div>
        );

      case "suggestions":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">
                {t("aiSuggestion.suggestionsTitle")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("aiSuggestion.suggestionsDescription")}
              </p>
            </div>
            <ul className="space-y-2 max-h-[25rem] overflow-y-auto notfs">
              {suggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 text-sm text-gray-700 hover:shadow-md"
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
            <div className="flex ">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentView("context");
                  setContextInput("");
                }}
                className="text-sm text-blue-800 border border-blue-800 hover:bg-blue-800 hover:text-white"
              >
                {t("aiSuggestion.tryAgainButton")}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Label htmlFor="summary" className="text-main">
          {t("personalInfo.summary")}
        </Label>
        <Textarea
          id="summary"
          name="summary"
          value={textContent}
          onChange={handleTextChange}
          placeholder={t("aiTextAreaPlaceholder")}
          rows={4}
          className="border-[#3B51A3] focus:ring-[#3B51A3] h-11/12 w-full pr-10"
          dir={lng === "ar" ? "rtl" : "ltr"}
        />
        {plan === "proPlus" && (
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className={cn(
                  "absolute bottom-2",
                  lng === "ar" ? "left-2" : "right-2",
                  "bg-[#3B51A3] hover:bg-[#2C3E8C] transition-colors duration-200",
                )}
              >
                <Wand2 className="h-4 w-4" />
                <span className="sr-only">
                  {t("aiSuggestion.buttonAriaLabel")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="min-w-[30rem] p-4 bg-white shadow-lg rounded-lg border-gray-200"
              side="right"
              align="end"
              alignOffset={-40}
              sideOffset={5}
            >
              {renderPopoverContent()}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
