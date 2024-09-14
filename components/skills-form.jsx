"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Combobox } from "./combobox";
import SelectWithSearch from "./component/selectWithSearch";

const skillOptions = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Go",
  "Rust",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "Agile",
  "Scrum",
  "DevOps",
  "Machine Learning",
  "Data Analysis",
  "Big Data",
  "Blockchain",
  "UI/UX Design",
  "Responsive Web Design",
  "SEO",
  "Digital Marketing",
];

export function SkillsForm({ skills, updateData }) {
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill,
    );
    updateData("skills", updatedSkills);
  };

  const addSkill = () => {
    updateData("skills", [...skills, { name: "", level: 1 }]);
  };

  const deleteSkill = (index) => {
    updateData(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4 p-4 rounded relative">
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <Button
                onClick={() => deleteSkill(index)}
                size="icon"
                className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
              <div>
                <Label
                  htmlFor={`skillName-${index}`}
                  className="text-[#20133E]"
                >
                  Skill Name
                </Label>
                <SelectWithSearch placeholder="Select or type a skill" />
              </div>
              <div>
                <Label
                  htmlFor={`skillLevel-${index}`}
                  className="text-[#20133E]"
                >
                  Skill Level
                </Label>
                <Select
                  value={skill.level.toString()}
                  onValueChange={(value) =>
                    handleSkillChange(index, "level", parseInt(value))
                  }
                >
                  <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Beginner</SelectItem>
                    <SelectItem value="2">Skillful</SelectItem>
                    <SelectItem value="3">Experienced</SelectItem>
                    <SelectItem value="4">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={addSkill}
          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}
