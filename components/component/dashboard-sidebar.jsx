"use client";
import Image from "next/image";
import { X, LogOut, File, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SubscriptionModal } from "@/components/cards/subscription-modal";
import { useTranslation } from "@/app/i18n/client";

export default function Sidebar({
  lng,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  userInfo,
  handleSignOut,
}) {
  const { t } = useTranslation(lng, "common");

  return (
    <div
      className={`bg-[#3b51a3] text-white w-64 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static absolute inset-y-0 left-0 z-30`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex bg-white rounded-md items-center">
          <Image
            src="/ar-logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mx-2"
          />
        </div>
        <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-4">
        <button
          className={`border flex justify-start items-center gap-4 w-full rounded-md text-left p-4 hover:bg-[#2c3e7a] ${
            activeTab === "Information" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Information")}
        >
          <File
            size={20}
            className={`mx-2 ${
              activeTab === "Information" ? "text-[#2c3e7a]" : "text-white"
            }`}
          />
          {t("dashboard.tabs.myInformation")}
        </button>
        <button
          className={`border flex justify-start items-center w-full rounded-md text-left p-4 hover:bg-[#2c3e7a] ${
            activeTab === "Resumes" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("Resumes")}
        >
          <Layout
            size={20}
            className={`mx-2 ${
              activeTab === "Resumes" ? "text-[#2c3e7a]" : "text-white"
            }`}
          />
          {t("dashboard.tabs.myResumes")}
        </button>
      </nav>
      <div className="flex p-4 gap-2">
        <UserProfileButton userInfo={userInfo} handleSignOut={handleSignOut} />
        <SubscriptionModal
          lng={lng}
          user={userInfo}
          currentPlan={userInfo.plan}
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[4rem] bg-white text-[#3b51a3] hover:bg-gray-200">
          <Image
            priority
            src={userInfo.image}
            alt="User"
            width={35}
            height={35}
            className="rounded-md"
          />
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
            <LogOut className="mx-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
