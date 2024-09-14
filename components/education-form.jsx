"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm({ educations, updateData }) {
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    updateData("educations", updatedEducations);
  };

  const addEducation = () => {
    updateData("educations", [
      ...educations,
      { degree: "", institution: "", graduationDate: "" },
    ]);
  };

  const deleteEducation = (index) => {
    updateData(
      "educations",
      educations.filter((_, i) => i !== index),
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          Education
        </h2>
        {educations.map((edu, index) => (
          <div key={index} className="mb-4 p-4 rounded  relative">
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <Button
                onClick={() => deleteEducation(index)}
                size="icon"
                className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
              <div>
                <Label htmlFor={`degree-${index}`} className="text-[#20133E]">
                  Degree
                </Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science"
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
              <div>
                <Label
                  htmlFor={`institution-${index}`}
                  className="text-[#20133E]"
                >
                  Institution
                </Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  placeholder="University Name"
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor={`graduationDate-${index}`}
                className="text-[#20133E]"
              >
                Graduation Date
              </Label>
              <Input
                id={`graduationDate-${index}`}
                type="date"
                value={edu.graduationDate}
                onChange={(e) =>
                  handleEducationChange(index, "graduationDate", e.target.value)
                }
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
          </div>
        ))}
        <Button
          onClick={addEducation}
          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
