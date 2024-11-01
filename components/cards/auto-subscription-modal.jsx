"use client";
import { useState, useEffect } from "react";
import {
  Palette,
  Sparkles,
  Star,
  Layout,
  Wand2,
  Crown,
  ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/app/i18n/client";

// Plan details array outside the component

export default function AutoSubscriptionModal({ defaultOpen, user, lng }) {
  const { t } = useTranslation(lng, "common");
  const [isOpen, setIsOpen] = useState(defaultOpen ? defaultOpen : false);
  const [loading, setLoading] = useState(false);
  const [paymentKey, setPaymentKey] = useState(null);
  const [error, setError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const plans = [
    {
      key: "pro",
      price: 9.99,
      periodKey: "period",
      features: [
        { textKey: t("plans.pro.features.advancedThemes"), icon: Palette },
        { textKey: t("plans.pro.features.templatesAvailable"), icon: Layout },
        { textKey: t("plans.pro.features.noWatermark"), icon: ImageIcon },
      ],
      buttonTextKey: "getPro",
      icon: Star,
    },
    {
      key: "proPlus",
      price: 19.99,
      periodKey: "period",
      features: [
        { textKey: t("plans.proPlus.features.premiumThemes"), icon: Crown },
        {
          textKey: t("plans.proPlus.features.templatesAvailable"),
          icon: Layout,
        },
        { textKey: t("plans.proPlus.features.aiSuggestions"), icon: Wand2 },
      ],
      buttonTextKey: "getProPlus",
      icon: Sparkles,
    },
  ];

  useEffect(() => {
    if (!defaultOpen) {
      const timer = setTimeout(() => setIsOpen(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [defaultOpen]);

  const handlePayment = async (planName) => {
    const currentUrl = window.location.href;
    localStorage.setItem("currentUrl", currentUrl);
    setLoading(true);
    setError(null);
    try {
      const selectedPlan = plans.find((plan) => plan.key === planName);
      const res = await fetch("/api/paymob-intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: "EGP",
          userEmail: user.email,
          userFirstName: user.name?.split(" ")[0] || "User",
          userLastName: user.name?.split(" ")[1] || "Name",
          plan: planName,
          return_url: currentUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to initialize payment");
      }

      const data = await res.json();
      if (data.payment_key) {
        setPaymentKey(data.payment_key);
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
            ? "bg-[#F2F2F2] max-w-6xl p-0 overflow-hidden border-none "
            : "sm:max-w-[800px] p-0 overflow-hidden bg-transparent border-none"
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
              src={`https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_IFRAME_ID}?payment_token=${paymentKey}`}
              className="w-full h-full border-none"
              title="Payment Frame"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="markting bg-gradient-to-br from-[#3b51a3] to-[#6478c9] p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-white">
                {t("subscription.title")}
              </h2>
              <p className="text-lg sm:text-xl mb-8 text-center text-[#d1d8f0]">
                {t("subscription.subtitle")}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
              <div className="absolute inset-0 bg-white/10 transform -skew-y-6 z-0 rounded-3xl"></div>
              <AnimatePresence>
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 relative z-10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-[#3b51a3]">
                        {t(`plans.${plan.key}.name`)}
                      </h3>
                      <plan.icon className="w-8 h-8 text-[#3b51a3]" />
                    </div>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#3b51a3]">
                        ${plan.price}
                      </span>
                      <span className="text-sm ml-1 text-gray-600">
                        /{t(`subscription.${plan.periodKey}`)}
                      </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <feature.icon className="w-5 h-5 mx-2 text-[#3b51a3]" />
                          <span>{feature.textKey}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      key={plan.key}
                      onClick={() => handlePayment(plan.key)}
                      disabled={loading}
                      className="w-full bg-[#3b51a3] text-white hover:bg-[#4b62b4] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("subscription.processing")}
                        </>
                      ) : (
                        t(`subscription.${plan.buttonTextKey}`)
                      )}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="link"
                className="text-white/80 hover:text-white underline-offset-4"
                onClick={() => setIsOpen(false)}
              >
                {t("subscription.currentPlan")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
