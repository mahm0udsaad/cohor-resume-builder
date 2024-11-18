"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const translations = {
  en: {
    title: "Almost there!",
    message: "We're redirecting you to your dashboard",
  },
  ar: {
    title: "اقتربنا!",
    message: "نقوم بتحويلك إلى لوحة التحكم الخاصة بك",
  },
};

export default function EnhancedLoadingPage() {
  const [dots, setDots] = useState(".");
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const isRTL = lng === "ar";
  const t = translations[lng] || translations.en; // Fallback to English if language not found

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "." : prevDots + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2" />
          <div
            className={`flex flex-col items-center justify-center p-8 ${
              isRTL ? "rtl" : "ltr"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-30 animate-ping" />
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin relative z-10" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6 mb-2">
              {t.title}
            </h2>
            <p className="text-center text-gray-600">
              {t.message}
              {dots}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
