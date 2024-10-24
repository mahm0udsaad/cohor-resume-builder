"use client";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SubscriptionModal({ currentPlan = "free", user, onSuccess }) {
  const [activeTab, setActiveTab] = useState(currentPlan);
  const [loading, setLoading] = useState(false);
  const [paymentKey, setPaymentKey] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const plans = {
    free: {
      name: "Free",
      price: 0,
      period: "forever",
      features: [
        { text: "Basic Theming", icon: Paintbrush },
        { text: "5 Templates Available", icon: Layout },
        { text: "Watermark", icon: ImageIcon },
      ],
      buttonText: "Current Plan",
      icon: Zap,
      gradient: "from-blue-400 to-blue-600",
    },
    pro: {
      name: "PRO",
      price: 9.99,
      period: "month",
      features: [
        { text: "Advanced Themes", icon: Palette },
        { text: "50+ Templates", icon: Layout },
        { text: "No Watermark", icon: ImageIcon },
      ],
      buttonText: "Upgrade to PRO",
      icon: Star,
      gradient: "from-purple-400 to-purple-600",
    },
    proPlus: {
      name: "PRO+",
      price: 19.99,
      period: "month",
      features: [
        { text: "Premium Themes", icon: Crown },
        { text: "100+ Templates", icon: Layout },
        { text: "AI Suggestions", icon: Wand2 },
      ],
      buttonText: "Upgrade to PRO+",
      icon: Sparkles,
      gradient: "from-pink-400 to-pink-600",
    },
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "https://accept.paymobsolutions.com") {
        try {
          const data = event.data;
          if (typeof data === "string" && data.includes("txn_response")) {
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
          }
        } catch (error) {
          console.error("Error processing payment message:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess]);

  const handlePayment = async () => {
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
          userFirstName: user.name.split(" ")[0] || "Mahmoud",
          userLastName: user.name.split(" ")[1] || "Mahmoud",
          userId: user.id,
          plan: activeTab, // Add this line
        }),
      });
      const data = await res.json();

      if (data.payment_key) {
        setPaymentKey(data.payment_key);
      } else {
        setError("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPlanContent = () => (
    <>
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b51a3] to-[#8a94d9]">
        Choose Your Plan
      </h1>
      <p className="text-center">Select the plan that best fits your needs</p>
      <div>
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
                {plan.name}
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
                    /{plan.period}
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
                      className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} mr-3`}
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
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col space-y-4">
        <Button
          disabled={loading || activeTab === "free"}
          onClick={handlePayment}
          className={`w-full bg-gradient-to-r ${plans[activeTab].gradient} text-white hover:opacity-90 transition-opacity duration-300`}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : activeTab === "free" ? (
            "Current Plan"
          ) : (
            `Subscribe to ${plans[activeTab].name}`
          )}
        </Button>
        {activeTab !== "free" && (
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            30-day money-back guarantee. No questions asked.
          </p>
        )}
      </div>
    </>
  );

  const renderPaymentStatus = () => {
    if (paymentStatus === "success") {
      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold text-green-500">
            Payment Successful!
          </h2>
          <p>Thank you for your purchase.</p>
        </div>
      );
    }
    if (paymentStatus === "failed") {
      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              Payment failed. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          Upgrade to PRO+
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        {paymentStatus ? (
          renderPaymentStatus()
        ) : !paymentKey ? (
          renderPlanContent()
        ) : (
          <div className="w-full h-[600px]">
            <iframe
              src={`https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_IFRAME_ID}?payment_token=${paymentKey}`}
              className="w-full h-full border-none"
              title="Payment Frame"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionModal;
