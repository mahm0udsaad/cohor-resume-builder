"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";

export default function PaymentBtn({ plan, user, lng }) {
  const { t } = useTranslation(lng, "common");

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/paymob-intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          currency: "SAR",
          userEmail: user.email,
          userFirstName: user.name.split(" ")[0],
          userLastName: user.name.split(" ")[1],
        }),
      });
      const data = await res.json();

      console.log("Payment initiation successful", data);
      if (data.payment_key) {
        window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_IFRAME_ID}?payment_token=${data.payment_key}`;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className={`w-full ${
        plan.highlighted
          ? "bg-[#3b51a3] hover:bg-[#2a3b7a] text-white"
          : "bg-gray-100 hover:bg-gray-200 text-[#3b51a3]"
      }`}
    >
      {t("pricingCta")}
    </Button>
  );
}
