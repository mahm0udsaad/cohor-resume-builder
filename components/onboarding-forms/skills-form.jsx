import { Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSkillsSearch } from "@/hooks/use-skill-search";
const skillLevels = [
  { value: "beginner", label: "skills.beginner" },
  { value: "skillful", label: "skills.skillful" },
  { value: "experienced", label: "skills.experienced" },
  { value: "expert", label: "skills.expert" },
];

export default function SkillsForm({ control, formData, t }) {
  const {
    searchTerm,
    setSearchTerm,
    isDropdownOpen,
    setIsDropdownOpen,
    filteredSkills,
    displaySkill,
  } = useSkillsSearch({ t });

  return (
    <Controller
      name="skills"
      control={control}
      defaultValue={formData}
      render={({ field: { value, onChange } }) => (
        <div className="space-y-6">
          <div className="">
            <Label htmlFor="skill-search" className="text-main">
              {t("skills.addSkill")}
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="skill-search"
                className="mt-1"
                autoComplete="off"
                placeholder={t("skills.selectOrTypeSkill")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              />
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        value.some((s) => s.name === skill) ? "bg-gray-100" : ""
                      }`}
                      onClick={() => {
                        if (!value.some((s) => s.name === skill)) {
                          onChange([
                            ...value,
                            { name: skill, level: "beginner" },
                          ]);
                        }
                        setSearchTerm("");
                      }}
                    >
                      {displaySkill(skill)}
                    </div>
                  ))}
                  {searchTerm && !filteredSkills.includes(searchTerm) && (
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        const skillToAdd = searchTerm;
                        onChange([
                          ...value,
                          { name: skillToAdd, level: "beginner" },
                        ]);
                        setSearchTerm("");
                      }}
                    >
                      {t("skills.addSkill")} "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <Button type="button" variant="ghost" onClick={() => onChange([])}>
            {t("skills.reset")}
          </Button>

          <div className="grid grid-cols-2 gap-2 justify-between items-center p-4 border-2 border-dashed border-gray-300 rounded-md">
            {value.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {displaySkill(skill.name)}
                  </div>
                </div>
                <div className="w-48">
                  <Select
                    value={skill.level}
                    onValueChange={(newLevel) => {
                      const updatedSkills = [...value];
                      updatedSkills[index].level = newLevel;
                      onChange(updatedSkills);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("skills.selectSkillLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {t(level.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => {
                    const updatedSkills = value.filter((_, i) => i !== index);
                    onChange(updatedSkills);
                  }}
                  size="icon"
                  variant="ghost"
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {value.length === 0 && (
              <span className="text-gray-500">{t("skills.noSkills")}</span>
            )}
          </div>
        </div>
      )}
    />
  );
}
