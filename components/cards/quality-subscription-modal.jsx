"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Sparkles,
  AlertTriangle,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

export function QualityUpgradeModal({
  lng,
  user,
  isOpen,
  setIsOpen,
  onContinue,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const { t } = useTranslation(lng, "common");

  const handlePayment = async () => {
    const currentUrl = window.location.href;
    localStorage.setItem("currentUrl", currentUrl);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/paymob-intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 9.99, // Pro plan price
          currency: "EGP",
          userEmail: user.email,
          userFirstName: user.name?.split(" ")[0] || "User",
          userLastName: user.name?.split(" ")[1] || "Name",
          plan: "pro",
          return_url: currentUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to initialize payment");
      }

      const data = await res.json();
      if (data.payment_key) {
        setRedirectUrl(
          `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_IFRAME_ID}?payment_token=${data.payment_key}`,
        );
      } else {
        throw new Error("No payment key received");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while processing your request.",
      );
      console.error("Payment initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={
          redirectUrl
            ? "bg-[#F2F2F2] max-w-6xl p-0 overflow-hidden border-none"
            : "sm:max-w-[600px] p-0 overflow-hidden"
        }
      >
        {redirectUrl ? (
          <div className="relative w-full h-[600px]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-[0.2rem] top-[0.3rem] z-10"
              onClick={() => {
                setRedirectUrl(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            <iframe
              src={redirectUrl}
              className="w-full h-full border-none"
              title="Payment Frame"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-[#3b51a3] to-[#5a73c5] p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-300" />
                  {t("enhanceResumeQuality")}
                </DialogTitle>
                <DialogDescription className="text-gray-100 mt-2">
                  {t("upgradeDescription")}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                  <Badge
                    variant="secondary"
                    className="text-sm py-1 px-2 bg-gray-200 text-gray-700"
                  >
                    {t("basic")}
                  </Badge>
                  <h4 className="font-medium text-lg text-gray-800">
                    {t("currentVersion")}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <X className="h-4 w-4 mx-2 text-gray-400" />
                      {t("basicFeatures.limitedFormatting")}
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 mx-2 text-gray-400" />
                      {t("basicFeatures.standardTemplates")}
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 mx-2 text-gray-400" />
                      {t("basicFeatures.basicPdfQuality")}
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 mx-2 text-gray-400" />
                      {t("basicFeatures.limitedAtsCompatibility")}
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 bg-white p-4 rounded-lg shadow-md border-2 border-[#3b51a3]">
                  <Badge
                    variant="default"
                    className="text-sm py-1 px-2 bg-[#3b51a3]"
                  >
                    {t("pro")}
                  </Badge>
                  <h4 className="font-medium text-lg text-gray-800">
                    {t("upgradedVersion")}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mx-2 text-[#3b51a3]" />
                      {t("proFeatures.advancedLayouts")}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mx-2 text-[#3b51a3]" />
                      {t("proFeatures.customTemplates")}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mx-2 text-[#3b51a3]" />
                      {t("proFeatures.highResolutionPdf")}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mx-2 text-[#3b51a3]" />
                      {t("proFeatures.multipleColorSchemes")}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mx-2 text-[#3b51a3]" />
                      {t("proFeatures.prioritySupport")}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                {t("upgradeMessage")}
              </div>
              <DialogFooter className="mt-8 gap-2">
                <Button
                  variant="default"
                  className="w-full sm:w-auto bg-[#3b51a3] hover:bg-[#4b61b3] text-white"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mx-2 animate-spin" />
                      {t("subscription.processing")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mx-2 h-4 w-4" />
                      {t("upgradeToPro")}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                  onClick={() => {
                    onContinue();
                    setIsOpen(false);
                  }}
                >
                  {t("continueWithBasic")}
                </Button>
              </DialogFooter>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
