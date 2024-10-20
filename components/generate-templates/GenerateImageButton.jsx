"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function GenerateImageButton({ templateName, elementId }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState(
    "idle" || "success" || "error" || "idle",
  );

  const generateImage = async () => {
    setIsGenerating(true);
    setStatus("idle");

    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error("Template element not found");

      // Wait for fonts to load
      await document.fonts.ready;

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
          templateName,
        }),
      });

      if (!response.ok) throw new Error("Failed to save image");

      const { path } = await response.json();
      setStatus("success");
      console.log(`Generated image saved to: ${path}`);
    } catch (error) {
      console.error("Error generating template image:", error);
      setStatus("error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={generateImage}
        disabled={isGenerating}
        variant={
          status === "error"
            ? "destructive"
            : status === "success"
            ? "outline"
            : "default"
        }
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : status === "success" ? (
          "Generated ✓"
        ) : status === "error" ? (
          "Failed ✕"
        ) : (
          "Generate Image"
        )}
      </Button>
    </div>
  );
}
