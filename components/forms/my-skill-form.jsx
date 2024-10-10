"use client";
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
import { Trash2, Plus, Save } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import Spinner from "../skeleton/spinner";
import { saveSkills } from "@/actions/resumes";
import { useToast } from "@/hooks/use-toast";

export default function SkillCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [localSkills, setLocalSkills] = useState(user.skills || []);
  const [originalSkills] = useState(user.skills || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { toast } = useToast();

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

  const addLocalSkill = (skillName) => {
    if (localSkills.some((s) => s.name === skillName)) return;
    const newSkill = { name: skillName, level: "beginner" };
    setLocalSkills([...localSkills, newSkill]);
    setSearchTerm("");
  };

  const updateLocalSkillLevel = (index, newLevel) => {
    setLocalSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills[index] = { ...newSkills[index], level: newLevel };
      return newSkills;
    });
  };

  const deleteLocalSkill = (index) => {
    setLocalSkills(localSkills.filter((_, i) => i !== index));
  };

  const hasChanges = () => {
    if (localSkills.length !== originalSkills.length) return true;
    return JSON.stringify(localSkills) !== JSON.stringify(originalSkills);
  };

  const saveAllChanges = async () => {
    startTransition(async () => {
      try {
        const result = await saveSkills(user.id, localSkills);
        
        if (result.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "All skills saved successfully",
            duration: 3000,
          });
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error saving skills:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save skills. Please try again.",
          duration: 3000,
        });
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold text-[#20133E]">
          {t("skills.title")}
        </CardTitle>
        {hasChanges() && (
          <Button
            onClick={saveAllChanges}
            disabled={isSaving}
            className="bg-[#3B51A3] hover:bg-[#2C3E8C]"
          >
            {isSaving ? (
              <Spinner />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        )}
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
                      localSkills.some((s) => s.name === skill)
                        ? "bg-gray-100"
                        : ""
                    }`}
                    onClick={() => addLocalSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
                {searchTerm && !filteredSkills.includes(searchTerm) && (
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => addLocalSkill(searchTerm)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("skills.addCustomSkill")}: {searchTerm}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {localSkills.map((skill, index) => (
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
                  onValueChange={(value) => updateLocalSkillLevel(index, value)}
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
                onClick={() => deleteLocalSkill(index)}
                variant="ghost"
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {localSkills.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              {t("skills.noSkills")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
