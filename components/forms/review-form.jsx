import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { updateUserResumeData } from "@/actions/resumes";
import { useSession } from "next-auth/react";
import { QualityUpgradeModal } from "@/components/cards/quality-subscription-modal";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Briefcase,
  User,
  Globe,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import { useFormTabs } from "@/hooks/use-forms-tabs";

export default function ReviewForm({
  resumeData,
  resumeName,
  theme,
  plan,
  lng,
}) {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const { activeTab, handleTabChange } = useFormTabs({ user, router });

  const sections = [
    { title: t("personalInformation.title"), key: "personalInfo", icon: User },
    { title: t("workExperience.title"), key: "experiences", icon: Briefcase },
    { title: t("education.title"), key: "educations", icon: Award },
    { title: t("skills.title"), key: "skills", icon: Code },
    { title: t("languages.title"), key: "languages", icon: Globe },
    { title: t("courses.title"), key: "courses", icon: BookOpen },
  ];

  const isComplete = (section) => {
    if (Array.isArray(resumeData[section])) {
      return (
        resumeData[section].length > 0 &&
        resumeData[section].some(
          (item) => !Object.values(item).every((value) => value === ""),
        )
      );
    }
    if (typeof resumeData[section] === "object") {
      return Object.values(resumeData[section]).some((value) => {
        if (Array.isArray(value))
          return value.length > 0 && value.some((item) => item !== "");
        return value !== "";
      });
    }
    return resumeData[section] !== "";
  };

  const completedSections = sections.filter((section) =>
    isComplete(section.key),
  ).length;
  const completionPercentage = (completedSections / sections.length) * 100;

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
          ...(theme && {
            theme: {
              name: theme.name,
              primaryColor: theme.primaryColor,
              backgroundColor: theme.backgroundColor,
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
            title: "Success",
            variant: "success",
            description: res.message,
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
        ...(theme && {
          theme: {
            name: theme.name,
            primaryColor: theme.primaryColor,
            backgroundColor: theme.backgroundColor,
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
          title: "Success",
          variant: "success",
          description: res.message,
        });
        router.push(`/review/${resumeName}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <CardContent className="space-y-6 p-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t("reviewResume.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("reviewResume.completedSections", {
              completed: completedSections,
              total: sections.length,
            })}
          </p>
          <Progress
            value={completionPercentage}
            className="w-full mt-2 text-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sections.map((section) => (
            <div
              key={section.key}
              onClick={() => handleTabChange(section.key)}
              className={`cursor-pointer transition-transform transform hover:scale-105 hover:ring-2 hover:ring-blue-500 ${
                activeTab === section.key
                  ? "scale-105 ring-2 ring-blue-500"
                  : ""
              } bg-white dark:bg-gray-800 shadow-md rounded-lg`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <section.icon
                    className={`w-6 h-6 ${
                      isComplete(section.key)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {section.title}
                  </span>
                </div>
                {isComplete(section.key) ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </CardContent>
            </div>
          ))}
        </div>

        {resumeName !== "onboarding" && (
          <div className="mt-6">
            <Button
              onClick={handleReview}
              disabled={isLoading}
              className="w-full bg-main"
            >
              {isLoading ? "Loading..." : t("reviewResume.title")}
            </Button>
          </div>
        )}
      </CardContent>
      <QualityUpgradeModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onContinue={handleContinue}
        lng={lng}
        user={user}
      />
    </Card>
  );
}
