"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { templates } from "@/helper/get-resume-engin";
const IMAGE_CONFIGS = {
  A4: {
    width: 800, // Standard A4 ratio but optimized for web
    height: 1131, // Maintains A4 ratio (1:√2)
    quality: 0.95,
    pixelRatio: 2,
  },
  SCREEN: {
    width: 1200, // Optimized for modern screens
    height: 1697, // Maintains A4 ratio
    quality: 0.95,
    pixelRatio: 2,
  },
  THUMBNAIL: {
    width: 400, // Smaller preview version
    height: 566, // Maintains A4 ratio
    quality: 0.9,
    pixelRatio: 1,
  },
};
export const convertToWebP = async (dataURL, quality = 0.9) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert to WebP
      resolve(canvas.toDataURL("image/webp", quality));
    };
    img.onerror = reject;
    img.src = dataURL;
  });
};

export const optimizeImage = async (
  dataURL,
  format,
  quality,
  targetWidth,
  targetHeight,
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate scaling to maintain aspect ratio
      const scale = Math.min(
        targetWidth / img.width,
        targetHeight / img.height,
      );

      // Calculate centered position
      const x = (targetWidth - img.width * scale) / 2;
      const y = (targetHeight - img.height * scale) / 2;

      // Draw scaled image
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Convert to desired format
      const mimeType = `image/${format}`;
      resolve(canvas.toDataURL(mimeType, quality));
    };
    img.onerror = reject;
    img.src = dataURL;
  });
};
export default function GenerateAllButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [generationStatuses, setGenerationStatuses] = useState([]);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState({
    format: "webp",
    preset: "A4",
  });

  const generateImage = async (element, templateName) => {
    const config = IMAGE_CONFIGS[options.preset];

    // Set initial size for better rendering
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;

    try {
      // Set temporary size for capture
      element.style.width = `${config.width}px`;
      element.style.height = `${config.height}px`;

      // Wait for layout
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Generate initial image
      const initialDataUrl = await toPng(element, {
        quality: 1,
        backgroundColor: "#ffffff",
        width: config.width,
        height: config.height,
      });

      // Optimize image
      const optimizedDataUrl = await optimizeImage(
        initialDataUrl,
        options.format,
        config.quality,
        config.width,
        config.height,
      );

      // Send to API with dimensions
      const response = await fetch("/api/save-template-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: optimizedDataUrl,
          templateName,
          format: options.format,
          dimensions: {
            width: config.width,
            height: config.height,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save image");
      }

      return await response.json();
    } catch (error) {
      throw error;
    } finally {
      // Restore original size
      element.style.width = originalWidth;
      element.style.height = originalHeight;
    }
  };

  const generateAllImages = async () => {
    setIsGenerating(true);
    setShowProgress(true);
    setProgress(0);
    setGenerationStatuses(
      templates.map((template) => ({
        templateName: template.name,
        status: "pending",
      })),
    );

    let completed = 0;

    for (const template of templates) {
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

        const result = await generateImage(element, template.name);

        setGenerationStatuses((prev) =>
          prev.map((status) =>
            status.templateName === template.name
              ? {
                  ...status,
                  status: "success",
                  fileSize: `${result.size.toFixed(1)}KB`,
                  dimensions: `${result.dimensions.width}×${result.dimensions.height}`,
                }
              : status,
          ),
        );
      } catch (error) {
        console.error(`Error generating ${template.name}:`, error);
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

  return (
    <>
      <div className="flex gap-4 items-center">
        <Select
          value={options.format}
          onValueChange={(value) =>
            setOptions((prev) => ({ ...prev, format: value }))
          }
          disabled={isGenerating}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="webp">WebP (Recommended)</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={options.preset}
          onValueChange={(value) =>
            setOptions((prev) => ({ ...prev, preset: value }))
          }
          disabled={isGenerating}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A4">A4 (Standard)</SelectItem>
            <SelectItem value="SCREEN">Screen (Large)</SelectItem>
            <SelectItem value="THUMBNAIL">Thumbnail</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={generateAllImages}
          disabled={isGenerating}
          className="min-w-[200px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate All Images"
          )}
        </Button>
      </div>

      <Dialog open={showProgress}>
        <DialogContent className="sm:max-w-[500px]">
          {/* ... existing dialog content ... */}
          <div className="max-h-[300px] overflow-y-auto">
            {generationStatuses.map(
              ({ templateName, status, error, fileSize, dimensions }) => (
                <div
                  key={templateName}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{templateName}</span>
                    {status === "success" && (
                      <span className="text-xs text-gray-500">
                        {dimensions} • {fileSize}
                      </span>
                    )}
                  </div>
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
              ),
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
