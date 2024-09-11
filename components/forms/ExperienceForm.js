// ExperienceForm.js
import React from "react";
import { Label, Input, Textarea, Button } from "@/components/ui/";
import { Plus, Trash2, Wand2 } from "lucide-react";

export const ExperienceForm = ({
  experiences,
  handleExperienceChange,
  deleteExperience,
  addExperience,
  generateWithAI,
}) => (
  <>
    {experiences.map((exp, index) => (
      <div
        key={index}
        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
      >
        <Button
          onClick={() => deleteExperience(index)}
          size="icon"
          className="absolute top-2 right-2 bg-[#3B51A3] text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {/* Job Title, Company, Start Date, End Date inputs */}
        <div>
          <Label
            htmlFor={`responsibilities-${index}`}
            className="text-[#20133E]"
          >
            Responsibilities
          </Label>
          <div className="relative">
            <Textarea
              id={`responsibilities-${index}`}
              value={exp.responsibilities}
              onChange={(e) =>
                handleExperienceChange(
                  index,
                  "responsibilities",
                  e.target.value,
                )
              }
              placeholder="Describe your key responsibilities and achievements"
              rows={3}
              className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
            />
            <Button
              onClick={() => generateWithAI(`experience-${index}`)}
              size="icon"
              className="absolute right-2 bottom-2 bg-[#3B51A3]"
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    ))}
    <Button onClick={addExperience} className="mt-2 bg-[#3B51A3]">
      <Plus className="h-4 w-4 mr-2" /> Add Experience
    </Button>
  </>
);
