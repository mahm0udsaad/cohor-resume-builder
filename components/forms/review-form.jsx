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
  Code,
  LanguagesIcon,
} from "lucide-react";
import { useFormTabs } from "@/hooks/use-forms-tabs";
import { ToastAction } from "../ui/toast";

export default function ReviewForm({
  resumeData,
  resumeName,
  theme,
  plan,
  lng,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { activeTab, handleTabChange } = useFormTabs({ user, router });

  const sections = [
    { title: t("personalInformation.title"), key: "personalInfo", icon: User },
    { title: t("workExperience.title"), key: "experiences", icon: Briefcase },
    { title: t("education.title"), key: "educations", icon: Award },
    { title: t("skills.title"), key: "skills", icon: Code },
    { title: t("languages.title"), key: "languages", icon: LanguagesIcon },
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

  return (
    <Card className=" overflow-hidden">
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
                <div className="flex items-center gap-3">
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
      </CardContent>
    </Card>
  );
}
