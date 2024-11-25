import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Award,
  Briefcase,
  CheckCircle,
  GraduationCap,
  User,
  BookOpen,
  LanguagesIcon,
} from "lucide-react";

const templatesWithImages = [
  "elegantModern",
  "creativeTimeLine",
  "professional",
  "gridLayout",
  "creative",
  "glow",
  "formal",
  "ProfessionalSidebar",
  "infographic",
  "dynamicModern",
];

// Helper function to safely check if a value is empty
const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "number") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return !value;
};

export function useFormTabs({ router, resumeData, t, resumeName }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
    { id: "languages", label: "Languages", icon: LanguagesIcon },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "review", label: "Review", icon: CheckCircle },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabs.find((tab) => tab.id === tabFromUrl)?.id || "personal";
  });

  const getFieldTranslation = (field) => {
    const translations = {
      name: t("validation.fields.name"),
      jobTitle: t("validation.fields.jobTitle"),
      summary: t("validation.fields.summary"),
      company: t("validation.fields.company"),
      startDate: t("validation.fields.startDate"),
      endDate: t("validation.fields.endDate"),
      responsibilities: t("validation.fields.responsibilities"),
      degree: t("validation.fields.degree"),
      institution: t("validation.fields.institution"),
      graduationDate: t("validation.fields.graduationDate"),
      profileImage: t("validation.fields.profileImage"),
    };
    return translations[field] || field;
  };

  const validatePersonalInfo = (data) => {
    const required = ["name", "jobTitle", "summary"];
    const missing = required
      .filter((field) => isEmpty(data[field]))
      .map((field) => getFieldTranslation(field));

    if (templatesWithImages.includes(resumeName)) {
      if (isEmpty(data.imageUrl)) {
        missing.push(getFieldTranslation("profileImage"));
      }
    }

    return {
      isValid: missing.length === 0,
      missing,
    };
  };

  const validateExperience = (experiences) => {
    if (!Array.isArray(experiences) || experiences.length === 0) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneExperience")],
      };
    }

    const required = ["jobTitle", "company", "startDate", "responsibilities"];
    const missing = [];

    experiences.forEach((exp, index) => {
      if (!exp || typeof exp !== "object") {
        missing.push(
          t("validation.messages.invalidExperience", {
            index: index + 1,
          }),
        );
        return;
      }

      required.forEach((field) => {
        if (isEmpty(exp[field])) {
          missing.push(
            t("validation.messages.experienceField", {
              index: index + 1,
              field: getFieldTranslation(field),
            }),
          );
        }
      });

      if (!exp.isCurrentJob && isEmpty(exp.endDate)) {
        missing.push(
          t("validation.messages.experienceField", {
            index: index + 1,
            field: getFieldTranslation("endDate"),
          }),
        );
      }
    });

    return {
      isValid: missing.length === 0,
      missing,
    };
  };

  const validateEducation = (educations) => {
    if (!Array.isArray(educations) || educations.length === 0) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneEducation")],
      };
    }

    const required = ["degree", "institution", "graduationDate"];
    const missing = [];

    educations.forEach((edu, index) => {
      if (!edu || typeof edu !== "object") {
        missing.push(
          t("validation.messages.invalidEducation", {
            index: index + 1,
          }),
        );
        return;
      }

      required.forEach((field) => {
        if (isEmpty(edu[field])) {
          missing.push(
            t("validation.messages.educationField", {
              index: index + 1,
              field: getFieldTranslation(field),
            }),
          );
        }
      });
    });

    return {
      isValid: missing.length === 0,
      missing,
    };
  };

  const validateSkills = (skills) => {
    if (!Array.isArray(skills))
      return {
        isValid: false,
        missing: [t("validation.messages.invalidSkills")],
      };

    return {
      isValid: skills.length > 0,
      missing:
        skills.length === 0 ? [t("validation.messages.atLeastOneSkill")] : [],
    };
  };

  const validateLanguages = (languages) => {
    if (!Array.isArray(languages) || languages.length === 0) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneLanguage")],
      };
    }

    const missing = [];
    languages.forEach((lang, index) => {
      if (!lang || typeof lang !== "object") {
        missing.push(
          t("validation.messages.invalidLanguage", {
            index: index + 1,
          }),
        );
        return;
      }

      if (isEmpty(lang.name) || isEmpty(lang.proficiency)) {
        missing.push(
          t("validation.messages.languageField", {
            index: index + 1,
          }),
        );
      }
    });

    return {
      isValid: missing.length === 0,
      missing,
    };
  };

  // Rest of the code remains the same...
  const validateCurrentTab = () => {
    switch (activeTab) {
      case "personal":
        return validatePersonalInfo(resumeData.personalInfo);
      case "experience":
        return validateExperience(resumeData.experiences);
      case "education":
        return validateEducation(resumeData.educations);
      case "skills":
        return validateSkills(resumeData.skills);
      case "languages":
        return validateLanguages(resumeData.languages);
      case "courses":
        return { isValid: true, missing: [] };
      case "review":
        return { isValid: true, missing: [] };
      default:
        return { isValid: true, missing: [] };
    }
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleTabChange = (value) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newIndex = tabs.findIndex((tab) => tab.id === value);

    if (newIndex < currentIndex) {
      setActiveTab(value);
      router.push(`?${createQueryString("tab", value)}`, { scroll: false });
      return;
    }

    const validation = validateCurrentTab();
    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: t("validation.incomplete"),
        description:
          t("validation.pleaseComplete", {
            tab: t(`tabs.${activeTab}`),
          }) +
          "\n" +
          validation.missing.join("\n"),
      });
      return;
    }

    setActiveTab(value);
    router.push(`?${createQueryString("tab", value)}`, { scroll: false });
  };

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextTab = tabs[Math.min(tabs.length - 1, currentIndex + 1)];
    handleTabChange(nextTab.id);
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const prevTab = tabs[Math.max(0, currentIndex - 1)];
    handleTabChange(prevTab.id);
  };

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabs.find((tab) => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  return {
    activeTab,
    handleTabChange,
    handleNextTab,
    handlePreviousTab,
    tabs,
  };
}
