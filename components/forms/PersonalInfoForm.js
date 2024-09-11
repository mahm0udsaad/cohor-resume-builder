// PersonalInfoForm.js
import React from "react";
import { Label, Input, Textarea, Button } from "@/components/ui/";
import { Wand2 } from "lucide-react";

export const PersonalInfoForm = ({
  personalInfo,
  handlePersonalInfoChange,
  generateWithAI,
}) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name" className="text-[#20133E]">
        Full Name
      </Label>
      <Input
        id="name"
        name="name"
        value={personalInfo.name}
        onChange={handlePersonalInfoChange}
        placeholder="John Doe"
        className="border-[#3B51A3] focus:ring-[#3B51A3]"
      />
    </div>
    {/* Similar structure for email and phone */}
    <div>
      <Label htmlFor="summary" className="text-[#20133E]">
        Professional Summary
      </Label>
      <div className="relative">
        <Textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handlePersonalInfoChange}
          placeholder="Brief overview of your professional background and key strengths"
          rows={4}
          className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
        />
        <Button
          onClick={() => generateWithAI("summary")}
          size="icon"
          className="absolute right-2 bottom-2 bg-[#3B51A3]"
        >
          <Wand2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
