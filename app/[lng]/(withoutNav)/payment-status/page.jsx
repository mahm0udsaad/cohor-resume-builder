"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";

export default function PaymentStatus({ params: { lng } }) {
  const { t } = useTranslation(lng, "common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const success = searchParams.get("success");
    const redirectUrl = localStorage.getItem("currentUrl");

    if (success === "true") {
      setStatus("success");
    } else if (success === "false") {
      setStatus("error");
    }

    if (redirectUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem("currentUrl");
            router.push(redirectUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [searchParams, router]);

  const statusContent = {
    loading: {
      icon: <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />,
      title: t("loading.title"),
      description: t("loading.description"),
      textColor: "text-blue-500",
    },
    success: {
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      title: t("success.title"),
      description: t("success.description"),
      textColor: "text-green-500",
    },
    error: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: t("error.title"),
      description: t("error.description"),
      textColor: "text-red-500",
    },
  };

  const content = statusContent[status];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto"
      >
        <Card className="w-full max-w-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {content.icon}
              </motion.div>
              <div className="space-y-2">
                <h1 className={`text-2xl font-bold ${content.textColor}`}>
                  {content.title}
                </h1>
                <p className="text-gray-600">{content.description}</p>
              </div>

              {(status === "success" || status === "error") && (
                <Alert
                  variant={status === "success" ? "default" : "destructive"}
                >
                  <AlertDescription>
                    {t("error.redirect", { count: countdown })}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>

          {status === "error" && (
            <CardFooter className="flex justify-center gap-4 pt-2">
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("error.goBack")}
              </Button>
              <Button onClick={() => window.location.reload()}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                {t("error.tryAgain")}
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
