"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Loader2, Subscript } from "lucide-react";

import { useResumeData } from "@/hooks/use-resume-data";
import { useTheme } from "@/hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "@/app/i18n/client";
import { ResumePreview } from "./component/review-section";
import { useFormTabs } from "@/hooks/use-forms-tabs";
import { useToast } from "@/hooks/use-toast";
import { updateUserResumeData } from "@/actions/resumes";
import { ToastAction } from "./ui/toast";
import { QualityUpgradeModal } from "./cards/quality-subscription-modal";
const SubscriptionModal = dynamic(
  () => import("@/components/cards/subscription-modal"),
  {
    loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
  },
);

const DynamicLanguagesForm = dynamic(() => import("./forms/lang-form"), {
  loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
});
const DynamicCoursesForm = dynamic(() => import("./forms/coureses-form"), {
  loading: () => <Skeleton className={"w-full h-[25rem] bg-gray-200"} />,
});
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

export function ResumeBuilder({ plans, initialData, resumeName, user, lng }) {
  const router = useRouter();
  const plan = user?.plan;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const { resumeData, updateResumeData, toggleLanguage, updateImageUrl } =
    useResumeData(initialData);

  const { selectedTheme, setSelectedTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const { t } = useTranslation(lng, "builder");

  const { activeTab, handleTabChange, handleNextTab, handlePreviousTab, tabs } =
    useFormTabs({ router, resumeData, t, resumeName });

  const checkModalShown = () => {
    if (typeof window !== "undefined") {
      return (
        sessionStorage.getItem(`qualityModalShown_${user?.email}`) === "true"
      );
    }
    return false;
  };

  const handleReview = async () => {
    if (plan !== "free") {
      setLoading(true);
      try {
        const updatedResumeData = {
          ...resumeData,
          ...(selectedTheme && {
            theme: {
              name: selectedTheme.name,
              primaryColor: selectedTheme.primaryColor,
              backgroundColor: selectedTheme.backgroundColor,
            },
          }),
        };

        const res = await updateUserResumeData(
          user.email,
          resumeName,
          updatedResumeData,
        );
        if (!res.success) {
          toast({
            title: t("notifications.errorAddingResume"),
            variant: "destructive",
            action: (
              <ToastAction onClick={handleReview} altText="Try again">
                {t("notifications.tryAgainButton")}
              </ToastAction>
            ),
          });
          return;
        }
        if (res.success) {
          toast({
            title: t("notifications.resumeAddedSuccess"),
            variant: "success",
            description: t("notifications.resumeAddedSuccessDesc"),
          });
          router.push(`/review/${resumeName}`);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    const modalShown = checkModalShown();
    if (!modalShown) {
      setIsModalOpen(true);
      sessionStorage.setItem(`qualityModalShown_${user?.email}`, "true");
    } else {
      handleContinue();
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const updatedResumeData = {
        ...resumeData,
        ...(selectedTheme && {
          theme: {
            name: selectedTheme.name,
            primaryColor: selectedTheme.primaryColor,
            backgroundColor: selectedTheme.backgroundColor,
          },
        }),
      };

      const res = await updateUserResumeData(
        user.email,
        resumeName,
        updatedResumeData,
      );
      if (!res.success) {
        toast({
          title: "Error updating resume",
          description: res.error,
          variant: "destructive",
        });
        return;
      }
      if (res.success) {
        toast({
          title: t("notifications.resumeAddedSuccess"),
          variant: "success",
          description: t("notifications.resumeAddedSuccessDesc"),
        });
        router.push(`/review/${resumeName}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container-xl mx-auto p-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
          {/* Resume Form Column */}
          <div className="space-y-6 flex flex-col ">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="flex sm:flex-nowrap flex-wrap mb-8">
                {tabs.map(({ id, icon: Icon }) => (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className="flex gap-1 data-[state=active]:text-white data-[state=active]:bg-[#3B51A3]"
                  >
                    <Icon className="size-4" />
                    <span className="text-[11px] ">{t(`tabs.${id}`)}</span>
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
                      plan={user?.plan}
                      updateImageUrl={updateImageUrl}
                      data={resumeData.personalInfo}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="experience">
                    <DynamicExperienceForm
                      lng={lng}
                      plan={user?.plan}
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
                  <TabsContent value="languages">
                    <DynamicLanguagesForm
                      lng={lng}
                      languages={resumeData.languages || []}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="courses">
                    <DynamicCoursesForm
                      lng={lng}
                      courses={resumeData.courses || []}
                      updateData={updateResumeData}
                    />
                  </TabsContent>
                  <TabsContent value="review">
                    <DynamicReviewForm
                      lng={lng}
                      plan={user?.plan}
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
              {activeTab === "review" ? (
                <Button
                  onClick={handleReview}
                  disabled={isLoading}
                  className=" bg-main"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5 text-white" />
                  ) : (
                    t("review")
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNextTab}
                  className={`bg-[#3B51A3] hover:bg-white hover:text-black`}
                >
                  {t("buttons.next")} {/* Translation for 'Next' */}
                  <ChevronLeft
                    className={`h-4 w-4 mx-2 ${
                      lng == "ar" ? "" : "rotate-180"
                    }`}
                  />
                </Button>
              )}
            </div>
          </div>

          <QualityUpgradeModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onContinue={handleContinue}
            plansPrices={plans}
            lng={lng}
            user={user}
          />
          {/* Resume Preview Column */}
          <ResumePreview
            template={resumeName}
            toggleLanguage={toggleLanguage}
            plan={user?.plan}
            resumeData={resumeData}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            showTemplates={showTemplates}
            setShowTemplates={setShowTemplates}
            lng={lng}
          />
        </div>
      </div>
    </div>
  );
}
