"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Plus,
  Download,
  Wand2,
  User,
  Trash2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const themes = [
  {
    id: "default",
    name: "Default",
    primaryColor: "#3B51A3",
    secondaryColor: "#542B72",
    textColor: "#20133E",
    backgroundColor: "#FFFFFF",
  },
  {
    id: "dark",
    name: "Dark",
    primaryColor: "#1E293B",
    secondaryColor: "#334155",
    textColor: "#E2E8F0",
    backgroundColor: "#0F172A",
  },
  {
    id: "nature",
    name: "Nature",
    primaryColor: "#2F855A",
    secondaryColor: "#276749",
    textColor: "#1A202C",
    backgroundColor: "#F0FFF4",
  },
  {
    id: "ocean",
    name: "Ocean",
    primaryColor: "#2B6CB0",
    secondaryColor: "#2C5282",
    textColor: "#1A202C",
    backgroundColor: "#EBF8FF",
  },
  {
    id: "sunset",
    name: "Sunset",
    primaryColor: "#C05621",
    secondaryColor: "#9C4221",
    textColor: "#1A202C",
    backgroundColor: "#FFFAF0",
  },
];

const getLevelLabel = (level) => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Skillful";
    case 3:
      return "Experienced";
    case 4:
      return "Expert";
    default:
      return "Beginner";
  }
};

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

const languageProficiencyOptions = [
  "Elementary proficiency",
  "Limited working proficiency",
  "Professional working proficiency",
  "Full professional proficiency",
  "Native or bilingual proficiency",
];

const Combobox = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? options.find((option) => option === value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  onChange(option === value ? "" : option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0",
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState([
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  ]);

  const [educations, setEducations] = useState([
    { degree: "", institution: "", graduationDate: "" },
  ]);

  const [skills, setSkills] = useState([{ name: "", level: 1 }]);

  const [languages, setLanguages] = useState([{ name: "", proficiency: "" }]);

  const [courses, setCourses] = useState([
    { name: "", institution: "", completionDate: "" },
  ]);

  const [customSections, setCustomSections] = useState([
    { title: "", content: "" },
  ]);

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showCustomSections, setShowCustomSections] = useState(false);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setExperiences((prevExperiences) => {
      const newExperiences = [...prevExperiences];
      newExperiences[index] = { ...newExperiences[index], [field]: value };
      return newExperiences;
    });
  };

  const handleEducationChange = (index, field, value) => {
    setEducations((prevEducations) => {
      const newEducations = [...prevEducations];
      newEducations[index] = { ...newEducations[index], [field]: value };
      return newEducations;
    });
  };

  const handleSkillChange = (index, field, value) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills[index] = { ...newSkills[index], [field]: value };
      return newSkills;
    });
  };

  const handleLanguageChange = (index, field, value) => {
    setLanguages((prevLanguages) => {
      const newLanguages = [...prevLanguages];
      newLanguages[index] = { ...newLanguages[index], [field]: value };
      return newLanguages;
    });
  };

  const handleCourseChange = (index, field, value) => {
    setCourses((prevCourses) => {
      const newCourses = [...prevCourses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return newCourses;
    });
  };

  const handleCustomSectionChange = (index, field, value) => {
    setCustomSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index] = { ...newSections[index], [field]: value };
      return newSections;
    });
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      { degree: "", institution: "", graduationDate: "" },
    ]);
  };

  const addSkill = () => {
    setSkills((prev) => [...prev, { name: "", level: 1 }]);
  };

  const addLanguage = () => {
    setLanguages((prev) => [...prev, { name: "", proficiency: "" }]);
  };

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { name: "", institution: "", completionDate: "" },
    ]);
  };

  const addCustomSection = () => {
    setCustomSections((prev) => [...prev, { title: "", content: "" }]);
  };

  const deleteExperience = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteEducation = (index) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteLanguage = (index) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteCourse = (index) => {
    setCourses((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteCustomSection = (index) => {
    setCustomSections((prev) => prev.filter((_, i) => i !== index));
  };

  const generateWithAI = (field) => {
    console.log(`Generating content for ${field} with AI`);
    alert(`AI generation for ${field} would happen here.`);
  };

  const resumeData = {
    personalInfo,
    experiences,
    educations,
    skills,
    languages,
    courses,
    customSections,
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#3b51a3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-white">
                ResumeBuilder
              </span>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <User className="h-4 w-4 mr-2" /> Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <h1 className="flex justify-center items-center md:flex-row flex-col text-3xl font-bold mb-6 text-center text-[#20133E]">
          Resume Builder
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Form Column */}
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5">
                {[
                  "personal",
                  "experience",
                  "education",
                  "skills",
                  "review",
                ].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="personal">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                      Personal Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-[#20133E]">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={personalInfo.name}
                          onChange={handlePersonalInfoChange}
                          placeholder="John Doe"
                          className="border-[#3B51A3] focus:ring-[#3B51A3]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[#20133E]">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          placeholder="john@example.com"
                          className="border-[#3B51A3] focus:ring-[#3B51A3]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-[#20133E]">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          placeholder="(123) 456-7890"
                          className="border-[#3B51A3] focus:ring-[#3B51A3]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="summary" className="text-[#20133E]">
                          Professional Summary
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="summary"
                            name="summary"
                            value={personalInfo.summary}
                            onChange={handlePersonalInfoChange}
                            placeholder="Brief overview of your professional background and key strengths"
                            rows={4}
                            className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
                          />
                          <Button
                            onClick={() => generateWithAI("summary")}
                            size="icon"
                            className="absolute right-2 bottom-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                          >
                            <Wand2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="experience">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                      Work Experience
                    </h2>
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
                      >
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                          <Button
                            onClick={() => deleteExperience(index)}
                            size="icon"
                            className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
                          <div>
                            <Label
                              htmlFor={`jobTitle-${index}`}
                              className="text-[#20133E]"
                            >
                              Job Title
                            </Label>
                            <Input
                              id={`jobTitle-${index}`}
                              value={exp.jobTitle}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "jobTitle",
                                  e.target.value,
                                )
                              }
                              placeholder="Software Engineer"
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`company-${index}`}
                              className="text-[#20133E]"
                            >
                              Company
                            </Label>
                            <Input
                              id={`company-${index}`}
                              value={exp.company}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "company",
                                  e.target.value,
                                )
                              }
                              placeholder="Tech Corp"
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <Label
                              htmlFor={`startDate-${index}`}
                              className="text-[#20133E]"
                            >
                              Start Date
                            </Label>
                            <Input
                              id={`startDate-${index}`}
                              type="date"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`endDate-${index}`}
                              className="text-[#20133E]"
                            >
                              End Date
                            </Label>
                            <Input
                              id={`endDate-${index}`}
                              type="date"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor={`responsibilities-${index}`}
                            className="text-[#20133E]"
                          >
                            Responsibilities
                          </Label>
                          <div className="relative">
                            <Textarea
                              id={`responsibilities-${index}`}
                              value={exp.responsibilities}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "responsibilities",
                                  e.target.value,
                                )
                              }
                              placeholder="Describe your key responsibilities and achievements"
                              rows={3}
                              className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
                            />
                            <Button
                              onClick={() =>
                                generateWithAI(`experience-${index}`)
                              }
                              size="icon"
                              className="absolute right-2 bottom-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                            >
                              <Wand2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={addExperience}
                      className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="education">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                      Education
                    </h2>
                    {educations.map((edu, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
                      >
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                          <Button
                            onClick={() => deleteEducation(index)}
                            size="icon"
                            className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
                          <div>
                            <Label
                              htmlFor={`degree-${index}`}
                              className="text-[#20133E]"
                            >
                              Degree
                            </Label>
                            <Input
                              id={`degree-${index}`}
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "degree",
                                  e.target.value,
                                )
                              }
                              placeholder="Bachelor of Science"
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`institution-${index}`}
                              className="text-[#20133E]"
                            >
                              Institution
                            </Label>
                            <Input
                              id={`institution-${index}`}
                              value={edu.institution}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "institution",
                                  e.target.value,
                                )
                              }
                              placeholder="University Name"
                              className="border-[#3B51A3] focus:ring-[#3B51A3]"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor={`graduationDate-${index}`}
                            className="text-[#20133E]"
                          >
                            Graduation Date
                          </Label>
                          <Input
                            id={`graduationDate-${index}`}
                            type="date"
                            value={edu.graduationDate}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "graduationDate",
                                e.target.value,
                              )
                            }
                            className="border-[#3B51A3] focus:ring-[#3B51A3]"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={addEducation}
                      className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="skills">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                      Skills
                    </h2>
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border rounded border-[#3B51A3] relative"
                      >
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
                            <Combobox
                              options={skillOptions}
                              value={skill.name}
                              onChange={(value) =>
                                handleSkillChange(index, "name", value)
                              }
                              placeholder="Select or type a skill"
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
                              value={skill.level.toString()}
                              onValueChange={(value) =>
                                handleSkillChange(
                                  index,
                                  "level",
                                  parseInt(value),
                                )
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
              </TabsContent>
              <TabsContent value="review">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                      Review Your Resume
                    </h2>
                    <div className="mb-4">
                      <Button
                        onClick={() => setShowLanguages(!showLanguages)}
                        className="mr-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                      >
                        {showLanguages ? "Hide Languages" : "Add Languages"}
                      </Button>
                      <Button
                        onClick={() => setShowCourses(!showCourses)}
                        className="mr-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                      >
                        {showCourses ? "Hide Courses" : "Add Courses"}
                      </Button>
                      <Button
                        onClick={() =>
                          setShowCustomSections(!showCustomSections)
                        }
                        className="bg-[#3B51A3] hover:bg-white hover:text-black"
                      >
                        {showCustomSections
                          ? "Hide Custom Sections"
                          : "Add Custom Sections"}
                      </Button>
                    </div>
                    {showLanguages && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 text-[#20133E]">
                          Languages
                        </h3>
                        {languages.map((lang, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 border rounded border-[#3B51A3] relative"
                          >
                            <div className="absolute top-0 right-0 mt-2 mr-2">
                              <Button
                                onClick={() => deleteLanguage(index)}
                                size="icon"
                                className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-8">
                              <Input
                                value={lang.name}
                                onChange={(e) =>
                                  handleLanguageChange(
                                    index,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="Language"
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                              <Select
                                value={lang.proficiency}
                                onValueChange={(value) =>
                                  handleLanguageChange(
                                    index,
                                    "proficiency",
                                    value,
                                  )
                                }
                              >
                                <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                                  <SelectValue placeholder="Select proficiency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {languageProficiencyOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                        <Button
                          onClick={addLanguage}
                          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Language
                        </Button>
                      </div>
                    )}
                    {showCourses && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 text-[#20133E]">
                          Courses & Training
                        </h3>
                        {courses.map((course, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 border rounded border-[#3B51A3] relative"
                          >
                            <div className="absolute top-0 right-0 mt-2 mr-2">
                              <Button
                                onClick={() => deleteCourse(index)}
                                size="icon"
                                className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-8">
                              <Input
                                value={course.name}
                                onChange={(e) =>
                                  handleCourseChange(
                                    index,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="Course Name"
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                              <Input
                                value={course.institution}
                                onChange={(e) =>
                                  handleCourseChange(
                                    index,
                                    "institution",
                                    e.target.value,
                                  )
                                }
                                placeholder="Institution"
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                              <Input
                                type="date"
                                value={course.completionDate}
                                onChange={(e) =>
                                  handleCourseChange(
                                    index,
                                    "completionDate",
                                    e.target.value,
                                  )
                                }
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          onClick={addCourse}
                          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Course
                        </Button>
                      </div>
                    )}
                    {showCustomSections && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 text-[#20133E]">
                          Custom Sections
                        </h3>
                        {customSections.map((section, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 border rounded border-[#3B51A3] relative"
                          >
                            <div className="absolute top-0 right-0 mt-2 mr-2">
                              <Button
                                onClick={() => deleteCustomSection(index)}
                                size="icon"
                                className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2 mt-8">
                              <Input
                                value={section.title}
                                onChange={(e) =>
                                  handleCustomSectionChange(
                                    index,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                placeholder="Section Title"
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                              <Textarea
                                value={section.content}
                                onChange={(e) =>
                                  handleCustomSectionChange(
                                    index,
                                    "content",
                                    e.target.value,
                                  )
                                }
                                placeholder="Section Content"
                                rows={3}
                                className="border-[#3B51A3] focus:ring-[#3B51A3]"
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          onClick={addCustomSection}
                          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Custom Section
                        </Button>
                      </div>
                    )}
                    <div className="mt-6">
                      <Button className="w-full bg-[#3B51A3] hover:bg-white hover:text-black">
                        <Download className="h-4 w-4 mr-2" /> Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {activeTab !== "review" && (
              <div className="flex justify-between">
                <Button
                  onClick={() =>
                    setActiveTab((prev) => {
                      const tabs = [
                        "personal",
                        "experience",
                        "education",
                        "skills",
                        "review",
                      ];
                      const currentIndex = tabs.indexOf(prev);
                      return tabs[Math.max(0, currentIndex - 1)];
                    })
                  }
                  className="bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button
                  onClick={() =>
                    setActiveTab((prev) => {
                      const tabs = [
                        "personal",
                        "experience",
                        "education",
                        "skills",
                        "review",
                      ];
                      const currentIndex = tabs.indexOf(prev);
                      return tabs[Math.min(tabs.length - 1, currentIndex + 1)];
                    })
                  }
                  className="bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  Next <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            )}
          </div>

          {/* Resume Preview Column */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#20133E]">
                Resume Preview
              </h2>
              <div className="flex space-x-2">
                {themes.map((theme) => (
                  <TooltipProvider key={theme.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setSelectedTheme(theme)}
                          className={`w-6 h-6 rounded-full ${
                            selectedTheme.id === theme.id
                              ? "ring-2 ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{theme.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <div
              className={`bg-[${selectedTheme.backgroundColor}] p-6 rounded-lg shadow`}
            >
              <h3
                className={`text-2xl font-bold mb-2 text-[${selectedTheme.textColor}]`}
              >
                {resumeData.personalInfo.name || "Your Name"}
              </h3>
              <p className={`text-[${selectedTheme.secondaryColor}] mb-4`}>
                {resumeData.personalInfo.email} |{" "}
                {resumeData.personalInfo.phone}
              </p>
              <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
                <h4
                  className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
                >
                  Professional Summary
                </h4>
                <p>{resumeData.personalInfo.summary}</p>
              </div>
              <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
                <h4
                  className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
                >
                  Work Experience
                </h4>
                {resumeData.experiences.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold">
                      {exp.jobTitle} at {exp.company}
                    </p>
                    <p
                      className={`text-sm text-[${selectedTheme.secondaryColor}]`}
                    >
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p>{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
              <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
                <h4
                  className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
                >
                  Education
                </h4>
                {resumeData.educations.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold">
                      {edu.degree} - {edu.institution}
                    </p>
                    <p
                      className={`text-sm text-[${selectedTheme.secondaryColor}]`}
                    >
                      Graduated: {edu.graduationDate}
                    </p>
                  </div>
                ))}
              </div>
              <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
                <h4
                  className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
                >
                  Skills
                </h4>
                <div className="flex flex-wrap">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`mr-2 mb-2 px-2 py-1 bg-[${selectedTheme.primaryColor}] text-white rounded`}
                    >
                      {skill.name} - {getLevelLabel(skill.level)}
                    </span>
                  ))}
                </div>
              </div>
              {/* Add more sections here based on the resumeData */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
