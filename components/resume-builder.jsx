"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";

import { useResumeData } from "@/hooks/use-resume-data";
import { useTheme } from "@/hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "@/app/i18n/client";
import { useSession } from "next-auth/react";
import { ResumePreview } from "./component/review-section";
import { useFormTabs } from "@/hooks/use-forms-tabs";
import AutoSubscriptionModal from "./cards/auto-subscription-modal";
const DynamicPersonalInfoForm = dynamic(
  () => import("@/components/forms/personal-info-form"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);
const DynamicExperienceForm = dynamic(
  () => import("@/components/forms/experience-form"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);
const DynamicEducationForm = dynamic(
  () => import("@/components/forms/education-form"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);
const DynamicSkillsForm = dynamic(
  () => import("@/components/forms/skills-form"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);
const DynamicReviewForm = dynamic(
  () => import("@/components/forms/review-form"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);

export function ResumeBuilder({ initalData, resumeName, lng }) {
  const { data: session } = useSession();
  const user = session?.user;
  const { resumeData, updateResumeData, toggleLanguage, updateImageUrl } =
    useResumeData(initalData);
  console.log(user);

  const { selectedTheme, setSelectedTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const { t } = useTranslation(lng, "builder");

  const router = useRouter();

  const { activeTab, handleTabChange, handleNextTab, handlePreviousTab, tabs } =
    useFormTabs({ user, router });

  return (
    <div className="min-h-screen">
      <div className="container-xl mx-auto p-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12  `}>
          {/* Resume Form Column */}
          <div className="space-y-6 flex flex-col ">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 mb-8">
                {tabs.map(({ id, icon: Icon }) => (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className="flex gap-2 data-[state=active]:text-white data-[state=active]:bg-[#3B51A3]"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[12px] ">{t(`tabs.${id}`)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <TabsContent value="personal">
                    <DynamicPersonalInfoForm
                      lng={lng}
                      updateImageUrl={updateImageUrl}
                      data={resumeData.personalInfo}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="experience">
                    <DynamicExperienceForm
                      lng={lng}
                      experiences={resumeData.experiences}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="education">
                    <DynamicEducationForm
                      lng={lng}
                      educations={resumeData.educations}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="skills">
                    <DynamicSkillsForm
                      lng={lng}
                      skills={resumeData.skills || []}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="review">
                    <DynamicReviewForm
                      lng={lng}
                      resumeName={resumeName}
                      resumeData={resumeData}
                      theme={selectedTheme}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
            <div className="flex justify-between mb-8">
              <Button
                onClick={handlePreviousTab}
                className={`bg-[#3B51A3] hover:bg-white hover:text-black`}
              >
                <ChevronLeft
                  className={`h-4 w-4 mx-2 ${lng == "ar" ? "rotate-180" : ""}`}
                />
                {t("buttons.previous")} {/* Translation for 'Previous' */}
              </Button>
              <Button
                disabled={activeTab === tabs[tabs.length - 1]}
                onClick={handleNextTab}
                className={`bg-[#3B51A3] hover:bg-white hover:text-black`}
              >
                {t("buttons.next")} {/* Translation for 'Next' */}
                <ChevronLeft
                  className={`h-4 w-4 mx-2 ${lng == "ar" ? "" : "rotate-180"}`}
                />
              </Button>
            </div>
          </div>

          {/* Resume Preview Column */}
          <ResumePreview
            template={resumeName}
            toggleLanguage={toggleLanguage}
            resumeData={resumeData}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            showTemplates={showTemplates}
            setShowTemplates={setShowTemplates}
            lng={lng}
          />
          <AutoSubscriptionModal user={user} lng={lng} />
        </div>
      </div>
    </div>
  );
}
