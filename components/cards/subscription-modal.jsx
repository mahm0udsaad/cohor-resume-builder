import { useState, useEffect } from "react";
import {
  Palette,
  Sparkles,
  Star,
  Zap,
  Layout,
  Paintbrush,
  Wand2,
  Crown,
  ImageIcon,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/app/i18n/client";

export function SubscriptionModal({
  currentPlan = "free",
  user,
  onSuccess,
  lng,
}) {
  const [activeTab, setActiveTab] = useState(currentPlan);
  const [loading, setLoading] = useState(false);
  const [paymentKey, setPaymentKey] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const { t } = useTranslation(lng, "common");
  const plans = {
    free: {
      name: t("plans.free.name"),
      price: 0,
      period: t("plans.free.period"),
      features: [
        { text: t("plans.free.features.basicTheming"), icon: Paintbrush },
        { text: t("plans.free.features.templatesAvailable"), icon: Layout },
        { text: t("plans.free.features.watermark"), icon: ImageIcon },
      ],
      buttonText: t("plans.free.buttonText"),
      icon: Zap,
      gradient: "from-blue-400 to-blue-600",
    },
    pro: {
      name: t("plans.pro.name"),
      price: 9.99,
      period: t("plans.pro.period"),
      features: [
        { text: t("plans.pro.features.advancedThemes"), icon: Palette },
        { text: t("plans.pro.features.templatesAvailable"), icon: Layout },
        { text: t("plans.pro.features.noWatermark"), icon: ImageIcon },
      ],
      buttonText: t("plans.pro.buttonText"),
      icon: Star,
      gradient: "from-purple-400 to-purple-600",
    },
    proPlus: {
      name: t("plans.proPlus.name"),
      price: 19.99,
      period: t("plans.proPlus.period"),
      features: [
        { text: t("plans.proPlus.features.premiumThemes"), icon: Crown },
        { text: t("plans.proPlus.features.templatesAvailable"), icon: Layout },
        { text: t("plans.proPlus.features.aiSuggestions"), icon: Wand2 },
      ],
      buttonText: t("plans.proPlus.buttonText"),
      icon: Sparkles,
      gradient: "from-pink-400 to-pink-600",
    },
  };
  // Handle both iframe messages and redirect callbacks
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "https://accept.paymobsolutions.com") {
        try {
          const data = event.data;
          // Handle 3D Secure redirect
          if (typeof data === "string" && data.includes("url=")) {
            const url = decodeURIComponent(data.split("url=")[1]);
            setRedirectUrl(url);
            return;
          }

          // Handle transaction response
          if (typeof data === "string" && data.includes("txn_response")) {
            handlePaymentResponse(data);
          }
        } catch (error) {
          console.error("Error processing payment message:", error);
          setError("An error occurred while processing the payment.");
        }
      }
    };

    // Handle redirect callback
    const handleRedirectCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const success = urlParams.get("success");
      const pending = urlParams.get("pending");

      if (success === "true") {
        setPaymentStatus("success");
        if (onSuccess) {
          onSuccess({
            success: true,
            transaction_id: urlParams.get("id"),
            amount: urlParams.get("amount_cents"),
          });
        }
        setTimeout(() => {
          setIsOpen(false);
          setPaymentKey(null);
          setPaymentStatus(null);
          // Clean up URL parameters
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }, 2000);
      } else if (pending === "true") {
        setPaymentStatus("pending");
      } else {
        setPaymentStatus("failed");
        setError("Payment failed. Please try again.");
      }
    };

    window.addEventListener("message", handleMessage);
    // Check for redirect callback on mount
    if (window.location.search.includes("success=")) {
      handleRedirectCallback();
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onSuccess]);

  const handlePaymentResponse = (data) => {
    try {
      const txnData = JSON.parse(data.split("txn_response=")[1]);
      if (txnData.success === true) {
        setPaymentStatus("success");
        if (onSuccess) {
          onSuccess(txnData);
        }
        setTimeout(() => {
          setIsOpen(false);
          setPaymentKey(null);
          setPaymentStatus(null);
        }, 2000);
      } else {
        setPaymentStatus("failed");
        setError("Payment failed. Please try again.");
        setTimeout(() => {
          setPaymentKey(null);
          setPaymentStatus(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error parsing transaction response:", error);
      setError("An error occurred while processing the payment.");
    }
  };
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
          amount: plans[activeTab].price,
          currency: "EGP",
          userEmail: user.email,
          userFirstName: user.name?.split(" ")[0] || "User",
          userLastName: user.name?.split(" ")[1] || "Name",
          plan: activeTab,
          return_url: currentUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to initialize payment");
      }

      const data = await res.json();
      if (data.payment_key) {
        setPaymentKey(data.payment_key);
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

  const renderPlanContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b51a3] to-[#8a94d9] mb-4">
        {t("subscription.title")}
      </h1>
      <p className="text-center mb-6">{t("subscription.subtitle")}</p>
      <Tabs
        defaultValue="free"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 bg-[#3b51a3]/10 p-1 rounded-lg">
          {Object.entries(plans).map(([key, plan]) => (
            <TabsTrigger
              key={key}
              value={key}
              className={`data-[state=active]:bg-gradient-to-r ${plan.gradient} data-[state=active]:text-white transition-all duration-300`}
            >
              {t(`subscription.plans.${key}.name`)}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(plans).map(([key, plan]) => (
          <TabsContent key={key} value={key} className="mt-4">
            <div className="text-center mb-6">
              <div
                className={`inline-block p-3 rounded-full bg-gradient-to-br ${plan.gradient} mb-4`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </div>
              <div
                className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`}
              >
                ${plan.price}
                <span className="text-xl font-normal text-gray-600 dark:text-gray-400">
                  /{t("subscription.period")}
                </span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center bg-[#3b51a3]/5 p-2 rounded-md transition-all duration-300 hover:bg-[#3b51a3]/10"
                >
                  <div
                    className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} mx-3`}
                  >
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        disabled={loading || activeTab === currentPlan}
        onClick={handlePayment}
        className={`w-full bg-gradient-to-r ${plans[activeTab].gradient} text-white hover:opacity-90 transition-opacity duration-300 mt-4`}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t("subscription.processing")}
          </>
        ) : activeTab === currentPlan ? (
          t("subscription.currentPlan")
        ) : (
          `${t("subscription.subscribe")} ${t(
            `subscription.plans.${activeTab}.name`,
          )}`
        )}
      </Button>
    </div>
  );

  const renderPaymentFrame = () => (
    <div className="relative w-full h-[600px]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10"
        onClick={() => {
          setPaymentKey(null);
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
  );

  const renderPaymentStatus = () => (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {paymentStatus === "success" ? (
        <>
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold text-green-500">
            Payment Successful!
          </h2>
          <p>Thank you for your purchase.</p>
        </>
      ) : paymentStatus === "pending" ? (
        <>
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <h2 className="text-2xl font-bold text-blue-500">
            Payment Processing
          </h2>
          <p>Please wait while we confirm your payment...</p>
        </>
      ) : (
        <Alert variant="destructive">
          <AlertDescription>Payment failed. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          {t("subscription.upgradeButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className={paymentKey ? "max-w-5xl p-0" : "max-w-2xl p-0"}>
        {paymentStatus
          ? renderPaymentStatus()
          : paymentKey
          ? renderPaymentFrame()
          : renderPlanContent()}
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionModal;
