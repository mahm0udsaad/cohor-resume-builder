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
      .filter((field) => !data[field]?.trim())
      .map((field) => getFieldTranslation(field));

    // Check if template requires image and validate image presence
    if (templatesWithImages.includes(resumeName)) {
      const hasImage = data.imageUrl && data.imageUrl.trim();
      if (!hasImage) {
        missing.push(getFieldTranslation("profileImage"));
      }
    }

    return {
      isValid: missing.length === 0,
      missing,
    };
  };

  const validateExperience = (experiences) => {
    if (!experiences.length) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneExperience")],
      };
    }

    const required = ["jobTitle", "company", "startDate", "responsibilities"];
    const missing = [];

    experiences.forEach((exp, index) => {
      required.forEach((field) => {
        if (!exp[field]?.trim()) {
          missing.push(
            t("validation.messages.experienceField", {
              index: index + 1,
              field: getFieldTranslation(field),
            }),
          );
        }
      });
      if (!exp.isCurrentJob && !exp.endDate) {
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
    if (!educations.length) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneEducation")],
      };
    }

    const required = ["degree", "institution", "graduationDate"];
    const missing = [];

    educations.forEach((edu, index) => {
      required.forEach((field) => {
        if (!edu[field]?.trim()) {
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
    return {
      isValid: skills.length > 0,
      missing:
        skills.length === 0 ? [t("validation.messages.atLeastOneSkill")] : [],
    };
  };

  const validateLanguages = (languages) => {
    if (!languages.length) {
      return {
        isValid: false,
        missing: [t("validation.messages.atLeastOneLanguage")],
      };
    }

    const missing = [];
    languages.forEach((lang, index) => {
      if (!lang.name?.trim() || !lang.proficiency?.trim()) {
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

    // Allow moving backwards without validation
    if (newIndex < currentIndex) {
      setActiveTab(value);
      router.push(`?${createQueryString("tab", value)}`, { scroll: false });
      return;
    }

    // Validate current tab before moving forward
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
