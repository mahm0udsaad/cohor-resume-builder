"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PaymentBtn({ plan, user, lng }) {
  const { t } = useTranslation(lng, "common");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const currentUrl = window.location.href;
    setLoading(true);
    try {
      const res = await fetch("/api/paymob-intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          plan: plan.name,
          currency: "SAR",
          userEmail: user.email,
          userFirstName: user.name.split(" ")[0],
          userLastName: user.name.split(" ")[1] || "user",
          return_url: currentUrl,
        }),
      });
      const data = await res.json();

      setLoading(false);

      if (data) {
        window.location.href = `https://ksa.paymob.com/unifiedcheckout/?publicKey=${data.public_key}&clientSecret=${data.client_secret}`;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
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
