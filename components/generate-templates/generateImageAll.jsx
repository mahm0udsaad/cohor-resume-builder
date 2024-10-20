"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { templates } from "../../helper/get-resume-engin";

export default function GenerateAllButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [generationStatuses, setGenerationStatuses] = useState([]);
  const [progress, setProgress] = useState(0);

  const generateAllImages = async () => {
    setIsGenerating(true);
    setShowProgress(true);
    setProgress(0);

    // Initialize statuses
    setGenerationStatuses(
      templates.map((template) => ({
        templateName: template.name,
        status: "pending",
      })),
    );

    let completed = 0;

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];

      // Update status to processing
      setGenerationStatuses((prev) =>
        prev.map((status) =>
          status.templateName === template.name
            ? { ...status, status: "processing" }
            : status,
        ),
      );

      try {
        const element = document.getElementById(`template-${template.name}`);
        if (!element) throw new Error("Template element not found");

        // Wait for fonts to load
        await document.fonts.ready;
        await new Promise((resolve) => setTimeout(resolve, 500)); // Give time for rendering

        // Generate the image
        const dataUrl = await toPng(element, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });

        // Send to API for saving
        const response = await fetch("/api/save-template-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageData: dataUrl,
            templateName: template.name,
          }),
        });

        if (!response.ok) throw new Error("Failed to save image");

        // Update status to success
        setGenerationStatuses((prev) =>
          prev.map((status) =>
            status.templateName === template.name
              ? { ...status, status: "success" }
              : status,
          ),
        );
      } catch (error) {
        // Update status to error
        setGenerationStatuses((prev) =>
          prev.map((status) =>
            status.templateName === template.name
              ? { ...status, status: "error", error: error.message }
              : status,
          ),
        );
      }

      completed++;
      setProgress((completed / templates.length) * 100);
    }

    setIsGenerating(false);
  };

  const closeDialog = () => {
    if (!isGenerating) {
      setShowProgress(false);
      setGenerationStatuses([]);
      setProgress(0);
    }
  };

  return (
    <>
      <Button
        onClick={generateAllImages}
        disabled={isGenerating}
        className="min-w-[200px]"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating All...
          </>
        ) : (
          "Generate All Images"
        )}
      </Button>

      <Dialog open={showProgress} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generating Template Images</DialogTitle>
          </DialogHeader>

          <div className="my-4">
            <Progress value={progress} className="w-full" />
            <div className="text-sm text-gray-500 mt-2">
              Progress: {Math.round(progress)}%
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {generationStatuses.map(({ templateName, status, error }) => (
              <div
                key={templateName}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="font-medium">{templateName}</span>
                <div className="flex items-center">
                  {status === "pending" && (
                    <span className="text-gray-500">Pending</span>
                  )}
                  {status === "processing" && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  {status === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {status === "error" && (
                    <div className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!isGenerating && (
            <Button onClick={closeDialog} className="mt-4">
              Close
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
