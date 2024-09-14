"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, Wand2 } from "lucide-react";

export function ExperienceForm({ experiences, updateData }) {
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp,
    );
    updateData("experiences", updatedExperiences);
  };

  const addExperience = () => {
    updateData("experiences", [
      ...experiences,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
  };

  const deleteExperience = () => {
    if (experiences.length > 1) {
      updateData("experiences", experiences.slice(0, experiences.length - 1));
    }
  };

  const generateWithAI = (field) => {
    console.log(`Generating content for ${field} with AI`);
    alert(`AI generation for ${field} would happen here.`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          Work Experience
        </h2>
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-4 relative border-b">
            <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
              <div>
                <Label htmlFor={`jobTitle-${index}`} className="text-[#20133E]">
                  Job Title
                </Label>
                <Input
                  id={`jobTitle-${index}`}
                  value={exp.jobTitle}
                  onChange={(e) =>
                    handleExperienceChange(index, "jobTitle", e.target.value)
                  }
                  placeholder="Software Engineer"
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
              <div>
                <Label htmlFor={`company-${index}`} className="text-[#20133E]">
                  Company
                </Label>
                <Input
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  placeholder="Tech Corp"
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <Label
                  htmlFor={`startDate-${index}`}
                  className="text-[#20133E]"
                >
                  Start Date
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "startDate", e.target.value)
                  }
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`} className="text-[#20133E]">
                  End Date
                </Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "endDate", e.target.value)
                  }
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
            </div>
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
                  className="absolute right-2 bottom-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <Button
            onClick={addExperience}
            className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
          {
            <Button
              onClick={deleteExperience}
              className="mt-2 bg-gray-200 hover:bg-white text-black"
            >
              <Minus className="h-4 w-4 mr-2" /> cancel
            </Button>
          }
        </div>
      </CardContent>
    </Card>
  );
}
