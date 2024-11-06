import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Trash2 } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { allSkills } from "@/data/data";

export default function SkillForm({ skills, updateData, lng }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation(lng, "forms");

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "skillful", label: "Skillful" },
    { value: "experienced", label: "Experienced" },
    { value: "expert", label: "Expert" },
  ];

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
  };

  const addSkill = (skillName = "") => {
    const newSkill = { name: skillName, level: "beginner" };
    const updatedSkills = [...skills, newSkill];
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
    setSearchTerm("");
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateData({ type: "UPDATE", path: ["skills"], value: updatedSkills });
  };

  const resetSkills = () => {
    updateData({ type: "UPDATE", path: ["skills"], value: [] });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="border-b text-2xl font-semibold mb-4 pb-2 text-main">
          {t("skills.title")}
        </h2>

        <div className="">
          <Label htmlFor="skill-search" className="text-main">
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
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              autoComplete="off"
            />
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      skills.some((s) => s.name === skill) ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      if (!skills.some((s) => s.name === skill)) {
                        addSkill(skill);
                      }
                    }}
                  >
                    {t(`skills.availableSkills.${skill}`)}
                  </div>
                ))}
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 `}
                  onClick={() => {
                    if (!skills.some((s) => s.name === searchTerm)) {
                      addSkill(searchTerm);
                    }
                  }}
                >
                  {searchTerm}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button className="my-4" variant="ghost" onClick={resetSkills}>
          {t("skills.reset")}
        </Button>
        <div className="grid grid-cols-2 gap-2 items-center p-4 border-2 border-dashed border-gray-300 rounded-md">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {" "}
                  {t(`skills.availableSkills.${skill.name}`)}
                </div>
              </div>
              <div className="w-48">
                <Select
                  value={skill.level}
                  onValueChange={(value) =>
                    handleSkillChange(index, "level", value)
                  }
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
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {skills.length === 0 && (
            <span className="text-gray-500">
              {t("skills.noSkillsSelected")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
