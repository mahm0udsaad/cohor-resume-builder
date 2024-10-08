import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useTranslation } from "@/app/i18n/client";
import Spinner from "../skeleton/spinner";

export default function SkillCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [skills, setSkills] = useState(user.skills || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "skillful", label: "Skillful" },
    { value: "experienced", label: "Experienced" },
    { value: "expert", label: "Expert" },
  ];

  const allSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "TypeScript",
    "Angular",
    "Vue.js",
    "Django",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "DevOps",
    "Machine Learning",
    "Artificial Intelligence",
    "GraphQL",
    "User Experience",
    "Technical Writing",
    "Leadership",
    "Communication",
  ];

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addSkill = async (skillName) => {
    if (skills.some((s) => s.name === skillName)) return;

    startTransition(async () => {
      const newSkill = { name: skillName, level: "beginner" };
      const updatedSkills = [...skills, newSkill];

      try {
        const response = await fetch("/api/user/skills/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            skillData: newSkill,
          }),
        });
            
        if (response.ok) {
          setSkills(updatedSkills);
          setSearchTerm("");
        }
      } catch (error) {
        console.error("Error saving skill:", error);
      }
    });
  };

  const updateSkillLevel = async (index, newLevel) => {
    startTransition(async () => {
      const updatedSkills = skills.map((skill, i) =>
        i === index ? { ...skill, level: newLevel } : skill,
      );

      try {
        const response = await fetch("/api/user/skills/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            skillIndex: index,
            updatedSkill: updatedSkills[index],
          }),
        });

        if (response.ok) {
          setSkills(updatedSkills);
        }
      } catch (error) {
        console.error("Error updating skill:", error);
      }
    });
  };

  const deleteSkill = async (index) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/user/skills/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            skillIndex: index,
          }),
        });

        if (response.ok) {
          setSkills(skills.filter((_, i) => i !== index));
        }
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#20133E]">
          {t("skills.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <Label htmlFor="skill-search" className="text-[#20133E]">
            {t("skills.addSkill")}
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="skill-search"
              className="border-[#3B51A3] focus:ring-[#3B51A3]"
              placeholder={t("skills.selectOrTypeSkill")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {isSearchFocused && searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      skills.some((s) => s.name === skill) ? "bg-gray-100" : ""
                    }`}
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
                {searchTerm && !filteredSkills.includes(searchTerm) && (
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => addSkill(searchTerm)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("skills.addCustomSkill")}: {searchTerm}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-b"
            >
              <div className="flex-1">
                <h3 className="font-medium text-[#20133E]">{skill.name}</h3>
              </div>
              <div className="w-48">
                <Select
                  value={skill.level}
                  onValueChange={(value) => updateSkillLevel(index, value)}
                >
                  <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                    <SelectValue placeholder={t("skills.selectSkillLevel")} />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {t(`skills.${level.label.toLowerCase()}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => deleteSkill(index)}
                disabled={isSaving}
                variant="ghost"
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
              >
                {isSaving ? <Spinner /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </div>
          ))}

          {skills.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              {t("skills.noSkills")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
