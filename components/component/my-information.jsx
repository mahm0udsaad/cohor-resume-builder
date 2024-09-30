"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  BookOpen,
  Edit,
  Plus,
} from "lucide-react";

export function MyInformationComponent({ initialUserInfo }) {
  const [userInfo, setUserInfo] = useState(
    initialUserInfo || {
      personalInfo: null,
      experiences: [],
      educations: [],
      skills: [],
      languages: [],
      courses: [],
    },
  );
  const [editItem, setEditItem] = useState({
    section: "personalInfo",
    index: null,
  });

  const handleEdit = (section, index = null) => {
    setEditItem({ section, index });
  };

  const handleSave = () => {
    // Implement save logic here
    setEditItem({ section: "personalInfo", index: null });
  };

  const handleAdd = (section) => {
    setUserInfo((prevInfo) => {
      const newInfo = { ...prevInfo };
      switch (section) {
        case "personalInfo":
          newInfo.personalInfo = {
            name: "",
            jobTitle: "",
            summary: "",
            contact: [],
          };
          break;
        case "experiences":
          newInfo.experiences.push({
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
          });
          break;
        case "educations":
          newInfo.educations.push({
            degree: "",
            institution: "",
            graduationDate: "",
          });
          break;
        case "skills":
          newInfo.skills.push({
            name: "",
            level: "beginner",
          });
          break;
        case "languages":
          newInfo.languages.push({
            name: "",
            proficiency: "",
          });
          break;
        case "courses":
          newInfo.courses.push({
            name: "",
            institution: "",
            completionDate: "",
          });
          break;
      }
      return newInfo;
    });
    handleEdit(
      section,
      section === "personalInfo" ? null : userInfo[section].length,
    );
  };

  const renderCardContent = (section, data) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return <p>No {section} added yet.</p>;
    }
    switch (section) {
      case "personalInfo":
        return (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {data.name || "No name provided"}
            </p>
            <p>
              <strong>Job Title:</strong> {data.jobTitle || "No job title"}
            </p>
            <p>
              <strong>Summary:</strong> {data.summary || "No summary"}
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              {(data.contact || []).join(", ") || "No contact details"}
            </p>
          </div>
        );
      case "experiences":
        return (
          <ul className="space-y-4">
            {data.map((exp, index) => (
              <li
                key={index}
                className="border-b pb-2 last:border-b-0 flex justify-between items-start"
              >
                <div>
                  <p>
                    <strong>{exp.jobTitle || "No job title"}</strong> at{" "}
                    {exp.company || "No company"}
                  </p>
                  <p>
                    {exp.startDate || "No start date"} -{" "}
                    {exp.endDate || "No end date"}
                  </p>
                  <p>{exp.responsibilities || "No responsibilities"}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("experiences", index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        );
      case "educations":
        return (
          <ul className="space-y-2">
            {data.map((edu, index) => (
              <li key={index} className="flex justify-between items-start">
                <div>
                  <p>
                    <strong>{edu.degree}</strong>
                  </p>
                  <p>
                    {edu.institution}, {edu.graduationDate}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("educations", index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        );
      case "skills":
        return (
          <ul className="grid grid-cols-2 gap-2">
            {data.map((skill, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  <span className="font-semibold">{skill.name}</span> -{" "}
                  {skill.level}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("skills", index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        );
      case "languages":
        return (
          <ul className="space-y-1">
            {data.map((lang, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  <span className="font-semibold">{lang.name}</span> -{" "}
                  {lang.proficiency}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("languages", index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        );
      case "courses":
        return (
          <ul className="space-y-2">
            {data.map((course, index) => (
              <li key={index} className="flex justify-between items-start">
                <div>
                  <p>
                    <strong>{course.name}</strong>
                  </p>
                  <p>
                    {course.institution}, {course.completionDate}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("courses", index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case "personalInfo":
        return <User className="h-6 w-6" />;
      case "experiences":
        return <Briefcase className="h-6 w-6" />;
      case "educations":
        return <GraduationCap className="h-6 w-6" />;
      case "skills":
        return <Code className="h-6 w-6" />;
      case "languages":
        return <Globe className="h-6 w-6" />;
      case "courses":
        return <BookOpen className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-4">
        {Object.entries(userInfo).map(([section, data]) => (
          <Card key={section} className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[#3b51a3] capitalize flex items-center gap-2">
                {getSectionIcon(section)}
                {section}
              </CardTitle>
              <div className="flex gap-2">
                {data === null || (Array.isArray(data) && data.length === 0) ? (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAdd(section)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(section)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>{renderCardContent(section, data)}</CardContent>
          </Card>
        ))}
      </div>
      <Dialog
        open={editItem.section !== "personalInfo" && editItem.index !== null}
        onOpenChange={() =>
          setEditItem({ section: "personalInfo", index: null })
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {editItem.section}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editItem.index !== null &&
              userInfo[editItem.section][editItem.index] &&
              Object.entries(userInfo[editItem.section][editItem.index]).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor={key} className="text-right capitalize">
                      {key}
                    </Label>
                    <Input
                      id={key}
                      defaultValue={value}
                      className="col-span-3"
                    />
                  </div>
                ),
              )}
          </div>
          <Button onClick={handleSave} className="bg-[#3b51a3] text-white">
            <Edit className="h-4 w-4 mr-2" /> Save changes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
