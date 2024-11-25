import Image from "next/image";
import { X, File, Layout, Wallet } from "lucide-react";
import { SubscriptionModal } from "@/components/cards/subscription-modal";
import { useTranslation } from "@/app/i18n/client";
import { DashUserBtn } from "./userBtn";

export default function Sidebar({
  lng,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  userInfo,
}) {
  const { t } = useTranslation(lng, "common");
  const isRTL = lng === "ar";

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative bg-[#3b51a3] text-white w-64 h-full flex flex-col transition-transform duration-300 ease-in-out 
          ${
            isRTL
              ? isSidebarOpen
                ? "translate-x-0"
                : "translate-x-full md:translate-x-0 right-0"
              : isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0 left-0"
          } z-30`}
        dir={isRTL ? "rtl" : "ltr"}
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
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label={isRTL ? "إغلاق القائمة" : "Close sidebar"}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
          <button
            className={`border flex justify-start items-center gap-4 w-full rounded-md p-4 hover:bg-[#2c3e7a] ${
              activeTab === "Information" ? "bg-white text-black" : ""
            }`}
            onClick={() => {
              setActiveTab("Information");
              setIsSidebarOpen(false);
            }}
          >
            <File
              size={20}
              className={`${isRTL ? "ml-2" : "mr-2"} ${
                activeTab === "Information" ? "text-[#2c3e7a]" : "text-white"
              }`}
            />
            {t("dashboard.tabs.myInformation")}
          </button>
          <button
            className={`border flex justify-start items-center w-full rounded-md p-4 hover:bg-[#2c3e7a] ${
              activeTab === "Resumes" ? "bg-white text-black" : ""
            }`}
            onClick={() => {
              setActiveTab("Resumes");
              setIsSidebarOpen(false);
            }}
          >
            <Layout
              size={20}
              className={`${isRTL ? "ml-2" : "mr-2"} ${
                activeTab === "Resumes" ? "text-[#2c3e7a]" : "text-white"
              }`}
            />
            {t("dashboard.tabs.myResumes")}
          </button>
          <button
            className={`border flex justify-start items-center w-full rounded-md p-4 hover:bg-[#2c3e7a] ${
              activeTab === "Subscriptions" ? "bg-white text-black" : ""
            }`}
            onClick={() => {
              setActiveTab("Subscriptions");
              setIsSidebarOpen(false);
            }}
          >
            <Wallet
              size={20}
              className={`${isRTL ? "ml-2" : "mr-2"} ${
                activeTab === "Subscriptions" ? "text-[#2c3e7a]" : "text-white"
              }`}
            />
            {t("dashboard.tabs.Subscriptions")}
          </button>
        </nav>

        <div className="flex p-4 gap-2">
          <DashUserBtn lng={lng} />
          <SubscriptionModal
            lng={lng}
            user={userInfo}
            currentPlan={userInfo?.plan}
            onSuccess={(paymentData) => {
              console.log("Payment successful:", paymentData);
            }}
          />
        </div>
      </div>
    </>
  );
}
