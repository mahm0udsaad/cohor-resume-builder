// SkillsForm.js
import React from "react";
import { Label, Input, Button, Slider } from "@/components/ui/";
import { Plus, Trash2 } from "lucide-react";

const getLevelLabel = (level) => {
  const labels = ["Beginner", "Skillful", "Experienced", "Expert"];
  return labels[level - 1] || "Beginner";
};

export const SkillsForm = ({
  skills,
  handleSkillChange,
  deleteSkill,
  addSkill,
}) => (
  <>
    {skills.map((skill, index) => (
      <div
        key={index}
        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
      >
        <Button
          onClick={() => deleteSkill(index)}
          size="icon"
          className="absolute top-2 right-2 bg-[#3B51A3] text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {/* Skill Name input and Skill Level slider */}
      </div>
    ))}
    <Button onClick={addSkill} className="mt-2 bg-[#3B51A3]">
      <Plus className="h-4 w-4 mr-2" /> Add Skill
    </Button>
  </>
);
