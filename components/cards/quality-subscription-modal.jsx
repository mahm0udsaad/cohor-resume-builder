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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertTriangle, Check, X, Loader2 } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { calculateDiscountedPrice } from "@/utils/getDiscount";

export function QualityUpgradeModal({
  plansPrices,
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
  const plan = plansPrices[1];
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
          amount: calculateDiscountedPrice(
            plansPrices[1]?.price,
            plansPrices[1]?.discount,
          ),
          currency: "SAR",
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
      if (data) {
        window.location.href = `https://ksa.paymob.com/unifiedcheckout/?publicKey=${data.public_key}&clientSecret=${data.client_secret}`;
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
            : "sm:max-w-[600px] p-0 overflow-hidden max-h-[95vh] w-[95vw]"
        }
      >
        {redirectUrl ? (
          <div className="relative w-full h-[90vh] max-h-[600px]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
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
            className="max-h-[90vh] overflow-y-auto notfs"
          >
            <div className="bg-gradient-to-br from-[#3b51a3] to-[#5a73c5] p-4 sm:p-6 text-white">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl sm:text-2xl font-semibold flex items-center gap-2 flex-wrap">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 flex-shrink-0" />
                  <span>{t("enhanceResumeQuality")}</span>
                </DialogTitle>

                <DialogDescription className="text-gray-100 text-sm sm:text-base">
                  {t("upgradeDescription")}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-4 sm:p-6 bg-gray-50">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-3 sm:space-y-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm py-1 px-2 bg-gray-200 text-gray-700"
                  >
                    {t("basic")}
                  </Badge>
                  <h4 className="font-medium text-base sm:text-lg text-gray-800">
                    {t("currentVersion")}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start sm:items-center gap-2">
                      <X className="h-4 w-4 mt-0.5 sm:mt-0 text-gray-400 flex-shrink-0" />
                      <span>{t("basicFeatures.limitedFormatting")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <X className="h-4 w-4 mt-0.5 sm:mt-0 text-gray-400 flex-shrink-0" />
                      <span>{t("basicFeatures.standardTemplates")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <X className="h-4 w-4 mt-0.5 sm:mt-0 text-gray-400 flex-shrink-0" />
                      <span>{t("basicFeatures.basicPdfQuality")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <X className="h-4 w-4 mt-0.5 sm:mt-0 text-gray-400 flex-shrink-0" />
                      <span>{t("basicFeatures.limitedAtsCompatibility")}</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 sm:space-y-4 bg-white p-3 sm:p-4 rounded-lg shadow-md border-2 border-[#3b51a3]">
                  <Badge
                    variant="default"
                    className="text-xs sm:text-sm py-1 px-2 bg-[#3b51a3]"
                  >
                    {t("pro")}
                  </Badge>
                  <h4 className="font-medium text-base sm:text-lg text-gray-800">
                    {t("upgradedVersion")}
                  </h4>
                  <div className="mb-6">
                    <div className="items-baseline">
                      <span className="text-4xl font-bold text-[#3b51a3]">
                        {calculateDiscountedPrice(plan?.price, plan?.discount)}
                        <span className="text-xl font-bold text-[#3b51a3]">
                          {t("SAR")}
                        </span>
                      </span>
                      {plan.discount > 0 && (
                        <p className="text-sm ml-2 line-through text-gray-400">
                          {plan.price} {t("SAR")}
                        </p>
                      )}
                    </div>
                    <div>
                      {plan.discount > 0 && (
                        <span className="ml-2 text-green-600 text-sm">
                          {plan.discount}% {t("discount")}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start sm:items-center gap-2">
                      <Check className="h-4 w-4 mt-0.5 sm:mt-0 text-[#3b51a3] flex-shrink-0" />
                      <span>{t("proFeatures.advancedLayouts")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <Check className="h-4 w-4 mt-0.5 sm:mt-0 text-[#3b51a3] flex-shrink-0" />
                      <span>{t("proFeatures.customTemplates")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <Check className="h-4 w-4 mt-0.5 sm:mt-0 text-[#3b51a3] flex-shrink-0" />
                      <span>{t("proFeatures.highResolutionPdf")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <Check className="h-4 w-4 mt-0.5 sm:mt-0 text-[#3b51a3] flex-shrink-0" />
                      <span>{t("proFeatures.multipleColorSchemes")}</span>
                    </li>
                    <li className="flex items-start sm:items-center gap-2">
                      <Check className="h-4 w-4 mt-0.5 sm:mt-0 text-[#3b51a3] flex-shrink-0" />
                      <span>{t("proFeatures.prioritySupport")}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <DialogFooter className="mt-6 sm:mt-8 gap-2 flex-col sm:flex-row">
                <Button
                  variant="default"
                  className="w-full sm:w-auto bg-[#3b51a3] hover:bg-[#4b61b3] text-white text-sm"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>{t("subscription.processing")}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      <span>{t("upgradeToPro")}</span>
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
