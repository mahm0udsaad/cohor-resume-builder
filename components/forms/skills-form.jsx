import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import SelectWithSearch from "@/components/component/selectWithSearch";

export default function SkillsForm({ skills, updateData }) {
  const [skillList, setSkillList] = useState(skills || []);

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "skillful", label: "Skillful" },
    { value: "experienced", label: "Experienced" },
    { value: "expert", label: "Expert" },
  ];

  // Handle changes to skill fields
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skillList];
    updatedSkills[index][field] = value;
    setSkillList(updatedSkills);
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
  };

  // Add a new empty skill
  const addSkill = () => {
    const newSkill = { name: "", level: "beginner" }; // Default new skill object
    const updatedSkills = [...skillList, newSkill];
    setSkillList(updatedSkills);
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
  };

  // Delete a skill by index
  const deleteSkill = (index) => {
    const updatedSkills = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkills);
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">Skills</h2>
        {skillList.map((skill, index) => (
          <div key={index} className=" rounded relative">
            <div className="flex items-center gap-4 mb-2 mt-8">
              <div className="flex-1">
                <Label
                  htmlFor={`skillName-${index}`}
                  className="text-[#20133E]"
                >
                  Skill Name
                </Label>
                <SelectWithSearch
                  placeholder="Select or type a skill"
                  value={skill.name}
                  onChange={(value) => handleSkillChange(index, "name", value)}
                />
              </div>
              <div>
                <Label
                  htmlFor={`skillLevel-${index}`}
                  className="text-[#20133E]"
                >
                  Skill Level
                </Label>
                <Select
                  value={skill.level || "beginner"}
                  onValueChange={(value) =>
                    handleSkillChange(index, "level", value)
                  }
                >
                  <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-5">
                <Button
                  onClick={() => deleteSkill(index)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            onClick={addSkill}
            className=" self-end mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
