import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Award,
  Briefcase,
  CheckCircle,
  ChevronLeft,
  GraduationCap,
  User,
  Globe,
  BookOpen,
} from "lucide-react";

export function useFormTabs({ user, router }) {
  const searchParams = useSearchParams();

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
    { id: "languages", label: "Languages", icon: Globe },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "review", label: "Review", icon: CheckCircle },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    return tabs.find((tab) => tab.id === tabFromUrl)?.id || "personal";
  });

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabs.find((tab) => tab.id === tabFromUrl)) {
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
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextTab = tabs[Math.min(tabs.length - 1, currentIndex + 1)];
    handleTabChange(nextTab.id);
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const prevTab = tabs[Math.max(0, currentIndex - 1)];
    handleTabChange(prevTab.id);
  };

  return {
    activeTab,
    handleTabChange,
    handleNextTab,
    handlePreviousTab,
    tabs,
  };
}
