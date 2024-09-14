"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "./ui/label";

const languageProficiencyOptions = [
  "Elementary proficiency",
  "Limited working proficiency",
  "Professional working proficiency",
  "Full professional proficiency",
  "Native or bilingual proficiency",
];

export function ReviewForm({ resumeData, updateData }) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = resumeData.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang,
    );
    updateData("languages", updatedLanguages);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = resumeData.courses.map((course, i) =>
      i === index ? { ...course, [field]: value } : course,
    );
    updateData("courses", updatedCourses);
  };

  const addLanguage = () => {
    updateData("languages", [
      ...resumeData.languages,
      { name: "", proficiency: "" },
    ]);
  };

  const addCourse = () => {
    updateData("courses", [
      ...resumeData.courses,
      { name: "", institution: "", completionDate: "" },
    ]);
  };

  const deleteLanguage = (index) => {
    updateData(
      "languages",
      resumeData.languages.filter((_, i) => i !== index),
    );
  };

  const deleteCourse = (index) => {
    updateData(
      "courses",
      resumeData.courses.filter((_, i) => i !== index),
    );
  };

  return (
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
        </div>
        {showLanguages && (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-[#20133E]">
              Languages
            </h3>
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="mb-4 p-4 rounded relative">
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <Button
                    onClick={() => deleteLanguage(index)}
                    size="icon"
                    className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
                  <div>
                    <Label
                      htmlFor={`languageName-${index}`}
                      className="text-[#20133E]"
                    >
                      Language
                    </Label>
                    <Input
                      value={lang.name}
                      onChange={(e) =>
                        handleLanguageChange(index, "name", e.target.value)
                      }
                      placeholder="Language"
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`languageProficiency-${index}`}
                      className="text-[#20133E]"
                    >
                      Proficiency
                    </Label>
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value) =>
                        handleLanguageChange(index, "proficiency", value)
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
          <div className="mb-4 p-4">
            <h3 className="text-xl font-semibold mb-4 text-[#20133E]">
              Courses & Training
            </h3>
            {resumeData.courses.map((course, index) => (
              <div key={index} className="mb-4 p-4 rounded relative">
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <Button
                    onClick={() => deleteCourse(index)}
                    size="icon"
                    className="bg-[#3B51A3] hover:bg-white hover:text-black text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2 mt-8">
                  <div>
                    <Label
                      htmlFor={`courseName-${index}`}
                      className="text-[#20133E]"
                    >
                      Course Name
                    </Label>
                    <Input
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(index, "name", e.target.value)
                      }
                      placeholder="Course Name"
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
                      value={course.institution}
                      onChange={(e) =>
                        handleCourseChange(index, "institution", e.target.value)
                      }
                      placeholder="Institution"
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`completionDate-${index}`}
                      className="text-[#20133E]"
                    >
                      Completion Date
                    </Label>
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

        <div className="mt-6">
          <Button className="w-full bg-[#3B51A3] hover:bg-white hover:text-black">
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
