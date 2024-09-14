"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SelectWithSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
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
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([skill]);
    }
  };
  return (
    <Select
      value={selectedSkills[0] || ""}
      onValueChange={handleSkillSelect}
      className="w-full"
    >
      <SelectTrigger
        className={`justify-between border-[#3b51a3] ${
          selectedSkills.length > 0
            ? "bg-[#3b51a338] text-[#3b51a3] font-bold"
            : ""
        }`}
      >
        <SelectValue placeholder="Select skills" className="text-black">
          {selectedSkills.length > 0 ? `${selectedSkills[0]}` : "Select Skills"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[300px] p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {filteredSkills.map((skill) => (
              <SelectItem
                key={skill}
                value={skill}
                className={`justify-start border-[#3b51a3] ${
                  selectedSkills.includes(skill)
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

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
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
