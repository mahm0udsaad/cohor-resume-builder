import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SelectWithSearch({ value, onChange, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(value || "");

  useEffect(() => {
    setSelectedSkill(value || "");
  }, [value]);

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "SQL",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "Agile",
  ];

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    onChange(skill);
  };

  return (
    <Select
      value={selectedSkill}
      onValueChange={handleSkillSelect}
      className="w-full"
    >
      <SelectTrigger
        className={`justify-between border-[#3b51a3] ${
          selectedSkill ? "bg-[#3b51a338] text-[#3b51a3] font-bold" : ""
        }`}
      >
        <SelectValue placeholder={placeholder} className="text-black">
          {selectedSkill || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-full p-4">
        <div className="flex flex-col gap-4">
          <div className="relative p-1 rounded-md border flex items-center gap-2">
            <SearchIcon className="size-4 ml-2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            {filteredSkills.map((skill) => (
              <SelectItem
                key={skill}
                value={skill}
                className={`justify-start border-[#3b51a3] ${
                  selectedSkill === skill
                    ? "bg-[#3b51a3] text-primary-foreground"
                    : ""
                }`}
              >
                {skill}
              </SelectItem>
            ))}
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
