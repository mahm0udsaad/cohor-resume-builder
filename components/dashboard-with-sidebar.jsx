"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/component/dashboard-sidebar";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeList from "./component/resume-list";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import InformationTab from "./dashoard/information-tab";
import UserSubscriptions from "./subscriptionTab";
export function DashboardWithSidebarComponent({
  lng,
  user,
  resumes,
  resumeData,
  subscriptions,
}) {
  const [expandedSections, setExpandedSections] = useState({
    experiences: true,
    educations: true,
    skills: true,
    languages: true,
    courses: true,
  });
  const [activeTab, setActiveTab] = useState("Information");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEdit = (section) => {
    // Implement edit functionality here
    console.log(`Editing ${section}`);
  };

  const handleSignOut = () => {
    // Implement sign out functionality here
    console.log("Signing out");
  };

  useEffect(() => {
    const handleResize = () => {
      // If the screen width is less than or equal to 768px (mobile view), close the sidebar
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        lng={lng}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userInfo={user}
        handleSignOut={handleSignOut}
        isProModalOpen={isProModalOpen}
        setIsProModalOpen={setIsProModalOpen}
      />
      <MainContent
        lng={lng}
        resumes={resumes}
        user={user}
        resumeData={resumeData}
        subscriptions={subscriptions}
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        handleEdit={handleEdit}
      />
    </div>
  );
}

function MainContent({
  activeTab,
  setIsSidebarOpen,
  resumeData,
  lng,
  user,
  resumes,
  subscriptions,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation(lng, "common");
  return (
    <div className="flex-1 overflow-auto bg-[#3b51a3] notfs">
      <div className="min-h-screen m-3 md:p-8 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="w-full flex justify-between items-center">
            <Link href="/gallery">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600">
                <Plus size={16} className="mx-2" />
                {t("dashboard.createNewResume")}
              </Button>
            </Link>
          </div>
        </div>

        {activeTab === "Information" && (
          <InformationTab
            lng={lng}
            user={user}
            initialData={resumeData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}

        {activeTab === "Resumes" && (
          <ResumeList lng={lng} resumes={resumes} user={user} />
        )}

        {activeTab === "Subscriptions" && (
          <UserSubscriptions
            userEmail={user.email}
            subscription={subscriptions}
            lng={lng}
          />
        )}
      </div>
    </div>
  );
}
