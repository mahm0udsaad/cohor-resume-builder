"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, LayoutTemplate, SquareX } from "lucide-react";

import { ThemeSelector } from "@/components/theme-selector";
import { useResumeData } from "@/hooks/use-resume-data";
import { useTheme } from "@/hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "@/app/i18n/client";
import { useAuth } from "@/context/auth";
import { filterResumeData } from "@/helper/filters";
import { updateUserResumeData } from "@/actions/resumes";

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
const DynamicGallery = dynamic(() => import("@/components/templates-gallery"), {
  loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  ssr: false,
});

export function ResumeBuilder({ ResumeComponent, resumeName, lng }) {
  const { t } = useTranslation(lng, "builder");
  const { resumeData, updateResumeData } = useResumeData();
  const { selectedTheme, setSelectedTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs = ["personal", "experience", "education", "skills", "review"];

  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabs.includes(tabFromUrl) ? tabFromUrl : "personal";
  });

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleTabChange = (value) => {
    setActiveTab(value);
    router.push(`?${createQueryString("tab", value)}`, { scroll: false });
  };

  const handleNextTab = () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const filteredData = filterResumeData(resumeData, activeTab);
    // Start the server action without waiting for it
    updateUserResumeData(user.email, resumeName, filteredData, activeTab);
    // Immediately move to the next tab
    const currentIndex = tabs.indexOf(activeTab);
    const nextTab = tabs[Math.min(tabs.length - 1, currentIndex + 1)];
    handleTabChange(nextTab);
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const prevTab = tabs[Math.max(0, currentIndex - 1)];
    handleTabChange(prevTab);
  };

  return (
    <div className="min-h-screen">
      <div className="container-xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* Resume Form Column */}
          <div className="space-y-6 flex flex-col ">
            {showTemplates ? (
              <DynamicGallery />
            ) : (
              <>
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger
                      value="personal"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      {t("tabs.personal")} {/* Translation for 'Personal' */}
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <BriefcaseIcon className="mr-2 h-4 w-4" />
                      {t("tabs.experience")}{" "}
                      {/* Translation for 'Experience' */}
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <BookIcon className="mr-2 h-4 w-4" />
                      {t("tabs.education")} {/* Translation for 'Education' */}
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <CpuIcon className="mr-2 h-4 w-4" />
                      {t("tabs.skills")} {/* Translation for 'Skills' */}
                    </TabsTrigger>
                    <TabsTrigger
                      value="review"
                      className="text-[#20133E] data-[state=active]:bg-[#3B51A3] data-[state=active]:text-white"
                    >
                      <CircleCheckIcon className="mr-2 h-4 w-4" />
                      {t("tabs.review")} {/* Translation for 'Review' */}
                    </TabsTrigger>
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
                          updateData={updateResumeData}
                        />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
                {activeTab !== "review" && (
                  <div className="flex justify-between mb-8">
                    <Button
                      onClick={handlePreviousTab}
                      className="bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      {t("buttons.previous")} {/* Translation for 'Previous' */}
                    </Button>
                    <Button
                      onClick={handleNextTab}
                      className="bg-[#3B51A3] hover:bg-white hover:text-black"
                    >
                      {t("buttons.next")} {/* Translation for 'Next' */}
                      <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Resume Preview Column */}
          <div className="overflow-auto notfs bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg min-h-[90dvh] max-h-screen  shadow-lg ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#20133E]">
                {t("resumePreview")} {/* Translation for 'Resume Preview' */}
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
                  } border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-gray-200`}
                >
                  {showTemplates ? (
                    <SquareX className="size-5" />
                  ) : (
                    <LayoutTemplate className="size-5" />
                  )}
                </Button>
              </div>
            </div>
            <ResumeComponent
              resumeData={resumeData}
              selectedTheme={selectedTheme}
              className={"scale-[0.6] transform -translate-y-[20%]"}
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
