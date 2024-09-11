// EducationForm.js
import React from "react";
import { Label, Input, Button } from "@/components/ui/";
import { Plus, Trash2 } from "lucide-react";

export const EducationForm = ({
  educations,
  handleEducationChange,
  deleteEducation,
  addEducation,
}) => (
  <>
    {educations.map((edu, index) => (
      <div
        key={index}
        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
      >
        <Button
          onClick={() => deleteEducation(index)}
          size="icon"
          className="absolute top-2 right-2 bg-[#3B51A3] text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {/* Degree, Institution, Graduation Date inputs */}
      </div>
    ))}
    <Button onClick={addEducation} className="mt-2 bg-[#3B51A3]">
      <Plus className="h-4 w-4 mr-2" /> Add Education
    </Button>
  </>
);
