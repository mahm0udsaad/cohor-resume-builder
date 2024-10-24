"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Book,
  Mail,
  Phone,
  MapPin,
  Edit,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Plus,
  LogOut,
  File,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ResumeList from "./component/resume-list";
import { SubscriptionModal } from "./cards/subscription-modal";
import { formatDate } from "@/helper/date";
export function DashboardWithSidebarComponent({
  lng,
  user,
  resumes,
  resumeData,
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

  return (
    <div className="flex h-screen  bg-gray-100">
      <Sidebar
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

function Sidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  userInfo,
  handleSignOut,
}) {
  return (
    <div
      className={`bg-[#3b51a3] text-white w-64 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static absolute inset-y-0 left-0 z-30`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex  items-center">
          <Image
            src="/cogor-logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mr-2"
          />
        </div>
        <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-4">
        <button
          className={`flex justify-start items-center gap-4 w-full rounded-md text-left p-4 hover:bg-[#2c3e7a] ${
            activeTab === "Information" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Information")}
        >
          <File size={20} className="mr-2 text-[#2c3e7a]" />
          Information
        </button>
        <button
          className={`flex justify-start items-center w-full rounded-md text-left p-4 hover:bg-[#2c3e7a] ${
            activeTab === "Resumes" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Resumes")}
        >
          <Layout size={20} className="mr-2 text-[#2c3e7a]" />
          Resumes
        </button>
      </nav>
      <div className="p-4 space-y-2">
        <UserProfileButton userInfo={userInfo} handleSignOut={handleSignOut} />
        <SubscriptionModal
          user={userInfo}
          onSuccess={(paymentData) => {
            // Handle successful payment
            console.log("Payment successful:", paymentData);
            // Update user subscription status, etc.
          }}
        />
      </div>
    </div>
  );
}

function UserProfileButton({ userInfo, handleSignOut }) {
  console.log(userInfo);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-white text-[#3b51a3] hover:bg-gray-200">
          <Image
            priority
            src={userInfo.image}
            alt="User"
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          User Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <p className="font-semibold">{userInfo.name}</p>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
          <Button
            variant="outline"
            className="w-full text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MainContent({
  activeTab,
  setIsSidebarOpen,
  resumeData,
  expandedSections,
  toggleSection,
  handleEdit,
  lng,
  user,
  resumes,
}) {
  return (
    <div className="flex-1 overflow-auto bg-[#3b51a3] notfs">
      <div className="m-3 md:p-8 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600">
            <Plus size={16} className="mr-2" />
            Create New Resume
          </Button>
        </div>

        {activeTab === "Information" && (
          <InformationTab
            userInfo={resumeData}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            handleEdit={handleEdit}
          />
        )}

        {activeTab === "Resumes" && (
          <ResumeList lng={lng} resumes={resumes} user={user} />
        )}
      </div>
    </div>
  );
}

function InformationTab({
  userInfo,
  expandedSections,
  toggleSection,
  handleEdit,
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <PersonalInfo userInfo={userInfo} handleEdit={handleEdit} />
        <Section
          title="Work Experience"
          icon={Briefcase}
          isExpanded={expandedSections.experiences}
          onToggle={() => toggleSection("experiences")}
          onEdit={() => handleEdit("experiences")}
        >
          {userInfo.experiences.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} />
          ))}
        </Section>
        <Section
          title="Education"
          icon={GraduationCap}
          isExpanded={expandedSections.educations}
          onToggle={() => toggleSection("educations")}
          onEdit={() => handleEdit("educations")}
        >
          {userInfo.educations.map((edu, index) => (
            <EducationItem key={index} education={edu} />
          ))}
        </Section>
        <Section
          title="Skills"
          icon={Code}
          isExpanded={expandedSections.skills}
          onToggle={() => toggleSection("skills")}
          onEdit={() => handleEdit("skills")}
        >
          <SkillsList skills={userInfo.skills} />
        </Section>
        <Section
          title="Languages"
          icon={Languages}
          isExpanded={expandedSections.languages}
          onToggle={() => toggleSection("languages")}
          onEdit={() => handleEdit("languages")}
        >
          <LanguagesList languages={userInfo.languages} />
        </Section>
        <Section
          title="Courses"
          icon={Book}
          isExpanded={expandedSections.courses}
          onToggle={() => toggleSection("courses")}
          onEdit={() => handleEdit("courses")}
        >
          {userInfo.courses.map((course, index) => (
            <CourseItem key={index} course={course} />
          ))}
        </Section>
      </div>
    </div>
  );
}

function PersonalInfo({ userInfo, handleEdit }) {
  return (
    <div className="bg-[#3b51a3] p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{userInfo.personalInfo.name}</h1>
        <EditButton onEdit={() => handleEdit("personalInfo")} />
      </div>
      <h2 className="text-xl mb-2">{userInfo.personalInfo.jobTitle}</h2>
      <p className="mb-4">{userInfo.personalInfo.summary}</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center">
          <Mail size={16} className="mr-2" /> {userInfo.personalInfo.contact[0]}
        </div>
        <div className="flex items-center">
          <Phone size={16} className="mr-2" />{" "}
          {userInfo.personalInfo.contact[1]}
        </div>
        <div className="flex items-center">
          <MapPin size={16} className="mr-2" />{" "}
          {userInfo.personalInfo.contact[2]}
        </div>
      </div>
    </div>
  );
}

function EditButton({ onEdit }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={onEdit}
          className="bg-white text-[#3b51a3] p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Edit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            This is a placeholder for the edit form. The actual form component
            will be added later.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Edit form placeholder</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  title,
  icon: Icon,
  children,
  isExpanded,
  onToggle,
  onEdit,
}) {
  return (
    <div className="border-b last:border-b-0">
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <Icon size={20} className="mr-2 text-[#3b51a3]" />
          <h2 className="text-xl font-semibold text-[#3b51a3]">{title}</h2>
        </div>
        <div className="flex items-center">
          <EditButton onEdit={onEdit} />
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {isExpanded && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}

function ExperienceItem({ experience }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="font-semibold">{experience.jobTitle}</h3>
      <p className="text-gray-600">{experience.company}</p>
      <p className="text-sm text-gray-500">
        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
      </p>
      <p className="mt-1">{experience.responsibilities}</p>
    </div>
  );
}

function EducationItem({ education }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="font-semibold">{education.degree}</h3>
      <p className="text-gray-600">{education.institution}</p>
      <p className="text-sm text-gray-500">
        Graduated: {formatDate(education.graduationDate)}
      </p>
    </div>
  );
}

function SkillsList({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
        >
          {skill.name} ({skill.level})
        </span>
      ))}
    </div>
  );
}

function LanguagesList({ languages }) {
  return (
    <ul className="list-disc list-inside">
      {languages.map((lang, index) => (
        <li key={index}>
          {lang.name} - {lang.proficiency}
        </li>
      ))}
    </ul>
  );
}

function CourseItem({ course }) {
  return (
    <div className="mb-2 last:mb-0">
      <h3 className="font-semibold">{course.name}</h3>
      <p className="text-gray-600">{course.institution}</p>
      <p className="text-sm text-gray-500">
        Completed: {formatDate(course.completionDate)}
      </p>
    </div>
  );
}
