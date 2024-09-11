// ResumePreview.js
import React from "react";
import {
  Button,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/";
import { ArrowLeft, Layout } from "lucide-react";

export const ResumePreview = ({
  showTemplates,
  setShowTemplates,
  SelectedTemplateComponent,
  resumeData,
}) => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-[#20133E]">Resume Preview</h2>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowTemplates(!showTemplates)}
              className="bg-[#3B51A3] text-white"
            >
              {showTemplates ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <Layout className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showTemplates ? "Back to Form" : "Choose Template"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <SelectedTemplateComponent data={resumeData} />
  </div>
);
