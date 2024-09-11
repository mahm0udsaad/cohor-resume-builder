// Main ResumeBuilder.js
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/";
import { ChevronLeft, User } from "lucide-react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { ResumePreview } from "@/components/ResumePreview";
import { DefaultTemplate, ModernTemplate } from "./ResumeTemplates";
import templateData from "./data.json";

const templates = [
  { id: "default", name: "Default", component: DefaultTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
];

export function ResumeBuilder() {
  // State declarations (personalInfo, experiences, educations, skills, etc.)

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Handler functions (handlePersonalInfoChange, handleExperienceChange, etc.)

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
      {/* Navigation bar */}
      <div className="container-lg mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#20133E]">
          Resume Builder
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Form Column */}
          <div className="space-y-6">
            {showTemplates ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                    Choose a Template
                  </h2>
                  {/* Template selection buttons */}
                </CardContent>
              </Card>
            ) : (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5">
                  {/* Tab triggers */}
                </TabsList>
                <TabsContent value="personal">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                        Personal Information
                      </h2>
                      <PersonalInfoForm
                        personalInfo={personalInfo}
                        handlePersonalInfoChange={handlePersonalInfoChange}
                        generateWithAI={generateWithAI}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="experience">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
                        Work Experience
                      </h2>
                      <ExperienceForm
                        experiences={experiences}
                        handleExperienceChange={handleExperienceChange}
                        deleteExperience={deleteExperience}
                        addExperience={addExperience}
                        generateWithAI={generateWithAI}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Similar TabsContent for education, skills, and review */}
              </Tabs>
            )}
            {/* Navigation buttons */}
          </div>

          {/* Resume Preview Column */}
          <ResumePreview
            showTemplates={showTemplates}
            setShowTemplates={setShowTemplates}
            SelectedTemplateComponent={selectedTemplate.component}
            resumeData={resumeData}
          />
        </div>
      </div>
    </div>
  );
}
