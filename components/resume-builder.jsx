"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, LayoutTemplate, SquareX } from "lucide-react";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { ExperienceForm } from "@/components/experience-form";
import { EducationForm } from "@/components/education-form";
import { SkillsForm } from "@/components/skills-form";
import { ReviewForm } from "@/components/review-form";
import { ThemeSelector } from "@/components/theme-selector";
import { useResumeData } from "@/hooks/use-resume-data";
import { useTheme } from "@/hooks/use-theme";
import JsonTemplateRenderer from "./templateRender";
import templateData from "@/data/data.json";
import TemplateGallery from "./templates-gallery";

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal");
  const { resumeData, updateResumeData } = useResumeData();
  const { selectedTheme, setSelectedTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("template-4");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleNextTab = () => {
    const tabs = ["personal", "experience", "education", "skills", "review"];
    const currentIndex = tabs.indexOf(activeTab);
    setActiveTab(tabs[Math.min(tabs.length - 1, currentIndex + 1)]);
  };

  const handlePreviousTab = () => {
    const tabs = ["personal", "experience", "education", "skills", "review"];
    const currentIndex = tabs.indexOf(activeTab);
    setActiveTab(tabs[Math.max(0, currentIndex - 1)]);
  };

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resume Form Column */}
          <div className="space-y-6 flex flex-col justify-between">
            {showTemplates ? (
              <TemplateGallery
                templateData={templateData}
                onSelect={handleSelectTemplate}
              />
            ) : (
              <>
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-5  mb-8">
                    <TabsTrigger
                      value="personal"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Personal
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <BriefcaseIcon className="mr-2 h-4 w-4" />
                      Experience
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <BookIcon className="mr-2 h-4 w-4" />
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <CpuIcon className="mr-2 h-4 w-4" />
                      Skills
                    </TabsTrigger>
                    <TabsTrigger
                      value="review"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <CircleCheckIcon className="mr-2 h-4 w-4" />
                      Review
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="experience">
                    <ExperienceForm
                      experiences={resumeData.experiences}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="education">
                    <EducationForm
                      educations={resumeData.educations}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="skills">
                    <SkillsForm
                      skills={resumeData.skills || []}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="review">
                    <ReviewForm
                      resumeData={resumeData}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                </Tabs>

                {activeTab !== "review" && (
                  <div className="flex justify-between pb-8">
                    <Button
                      onClick={handlePreviousTab}
                      className="bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button
                      onClick={handleNextTab}
                      className="bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      Next <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Resume Preview Column */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200  p-6 rounded-lg min-h-[90dvh] ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#20133E]">
                Resume Preview
              </h2>
              <div className="flex items-center gap-4">
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                />

                <Button
                  type="button"
                  onClick={() => setShowTemplates(!showTemplates)}
                  className={`${
                    showTemplates
                      ? "bg-[#3B51A3] text-white"
                      : "bg-white text-black"
                  }  border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-gray-200`}
                >
                  {showTemplates ? (
                    <SquareX className="size-5" />
                  ) : (
                    <LayoutTemplate className="size-5" />
                  )}
                </Button>
              </div>
            </div>
            <JsonTemplateRenderer
              userData={resumeData}
              selectedTheme={selectedTheme}
              templateData={templateData[selectedTemplate]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CpuIcon(props) {
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
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
