"use client";

import React from "react";
import Logo from "./component/logo";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";

const LoadingPage = () => {
  const pathname = usePathname();
  const pathList = pathname.split("/");
  const lng = pathList[1];

  const { t } = useTranslation(lng, "common");
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center items-center space-y-8 text-center">
        <div className="animation animate-pulse	">
          <Logo />
        </div>
        <p className="mt-2 text-sm text-gray-600">{t("loadingText")}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
