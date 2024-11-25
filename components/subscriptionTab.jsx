"use client";

import { useState, useEffect } from "react";
import { format, differenceInSeconds } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/app/i18n/client";

export default function UserSubscriptions({ subscription, lng }) {
  const { t } = useTranslation(lng, "common");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  if (!subscription) {
    return (
      <div className="container mx-auto p-6 max-w-11/12">
        <h1 className="text-3xl font-bold mb-6 text-[#3b51a3]">
          {t("your_subscription")}
        </h1>
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <p className="text-xl text-gray-600 mb-4">{t("no_plan_message")}</p>
        </div>
      </div>
    );
  }

  function calculateTimeLeft() {
    const difference = differenceInSeconds(
      new Date(subscription?.endDate),
      new Date(),
    );
    if (difference > 0) {
      const days = Math.floor(difference / (60 * 60 * 24));
      const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((difference % (60 * 60)) / 60);
      const seconds = difference % 60;
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [subscription?.endDate]);

  const formatDate = (date) => {
    return format(new Date(date), "MMMM d, yyyy HH:mm:ss");
  };

  return (
    <div className="container mx-auto p-6 max-w-11/12">
      <h1 className="text-3xl font-bold mb-6 text-[#3b51a3]">
        {t("your_package")}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold capitalize">
            {t("plan_label", { plan: subscription.plan })}
          </span>
          <Badge
            variant={subscription.status === "active" ? "default" : "secondary"}
          >
            {t(subscription.status)}
          </Badge>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t("transaction_id")}</span>
            <span className="font-medium">{subscription.transactionId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t("amount")}</span>
            <span className="font-medium">
              {t("SAR")} {subscription.amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t("payment_date")}</span>
            <span className="font-medium">
              {formatDate(subscription.paymentDate)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t("end_date")}</span>
            <span className="font-medium">
              {formatDate(subscription.endDate)}
            </span>
          </div>
        </div>
        <Separator />
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#3b51a3]">
            {t("time_remaining")}
          </h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-[#3b51a3]/10 p-3 rounded-lg">
                <div className="text-3xl font-bold text-[#3b51a3]">{value}</div>
                <div className="text-xs uppercase text-gray-600">{t(unit)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
