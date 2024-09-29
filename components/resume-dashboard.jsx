"use client";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  FileText,
  Download,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  BookOpen,
  Edit,
  Plus,
} from "lucide-react";

export function ResumeDashboard() {
  const [userInfo, setUserInfo] = useState({
    personalInfo: {
      name: "John Doe",
      jobTitle: "Software Engineer",
      summary:
        "Experienced software engineer with a passion for creating efficient and scalable applications.",
      contact: ["johndoe@email.com", "+1 (555) 123-4567"],
    },
    experiences: [
      {
        jobTitle: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        startDate: "2020-01",
        endDate: "Present",
        responsibilities:
          "Led development of cloud-based applications, mentored junior developers.",
      },
      {
        jobTitle: "Software Engineer",
        company: "Innovative Systems LLC",
        startDate: "2017-06",
        endDate: "2019-12",
        responsibilities:
          "Developed and maintained web applications using React and Node.js.",
      },
    ],
    educations: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        graduationDate: "2015-05",
      },
      {
        degree: "Master of Science in Software Engineering",
        institution: "Tech Institute",
        graduationDate: "2017-05",
      },
    ],
    skills: [
      { name: "JavaScript", level: "advanced" },
      { name: "React", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Intermediate" },
    ],
    courses: [
      {
        name: "Advanced React Patterns",
        institution: "Frontend Masters",
        completionDate: "2022-06",
      },
      {
        name: "Machine Learning Fundamentals",
        institution: "Coursera",
        completionDate: "2021-09",
      },
    ],
  });

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
    switch (section) {
      case "personalInfo":
        return (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Job Title:</strong> {data.jobTitle}
            </p>
            <p>
              <strong>Summary:</strong> {data.summary}
            </p>
            <p>
              <strong>Contact:</strong> {data.contact.join(", ")}
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
                    <strong>{exp.jobTitle}</strong> at {exp.company}
                  </p>
                  <p>
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p>{exp.responsibilities}</p>
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
    <div className="container mx-auto">
      <Tabs defaultValue="myInformation" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="myInformation">My Information</TabsTrigger>
          <TabsTrigger value="myResumes">My Resumes</TabsTrigger>
        </TabsList>
        <TabsContent value="myInformation" className="space-y-4">
          {Object.entries(userInfo).map(([section, data]) => (
            <Card key={section} className="bg-white shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[#3b51a3] capitalize flex items-center gap-2">
                  {getSectionIcon(section)}
                  {section}
                </CardTitle>
                <div className="flex gap-2">
                  {section === "personalInfo" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit("personalInfo")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Personal Information</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {Object.entries(data).map(([key, value]) => (
                            <div
                              key={key}
                              className="grid grid-cols-4 items-center gap-4"
                            >
                              <Label
                                htmlFor={key}
                                className="text-right capitalize"
                              >
                                {key}
                              </Label>
                              {key === "contact" ? (
                                <div className="col-span-3 space-y-2">
                                  {value.map((contact, index) => (
                                    <Input
                                      key={index}
                                      id={`contact-${index}`}
                                      defaultValue={contact}
                                      className="w-full"
                                    />
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                      setUserInfo((prev) => ({
                                        ...prev,
                                        personalInfo: {
                                          ...prev.personalInfo,
                                          contact: [
                                            ...prev.personalInfo.contact,
                                            "",
                                          ],
                                        },
                                      }));
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                    Contact
                                  </Button>
                                </div>
                              ) : (
                                <Input
                                  id={key}
                                  defaultValue={value}
                                  className="col-span-3"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={handleSave}
                          className="bg-[#3b51a3] text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" /> Save changes
                        </Button>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAdd(section)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>{renderCardContent(section, data)}</CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value="myResumes"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[1, 2, 3].map((resume) => (
            <Link href={`/builder/${resume}`} key={resume} className="block">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#3b51a3]">
                    Resume {resume}
                  </CardTitle>
                  <CardDescription>
                    Last updated: {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <FileText size={64} className="text-[#3b51a3]" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
          <Card className="bg-white shadow-md flex items-center justify-center">
            <Button
              variant="ghost"
              className="h-[200px] w-full flex flex-col items-center gap-2"
            >
              <PlusCircle size={48} className="text-[#3b51a3]" />
              <span className="text-[#3b51a3] font-semibold">
                Create New Resume
              </span>
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
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
    </div>
  );
}
