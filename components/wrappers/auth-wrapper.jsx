"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AnimatedCheckEmailCard from "../cards/verfy-card";
import { AuthForm } from "../forms/auth"; // We'll create this next
import { resendVerificationEmail } from "@/lib/auth";

export default function AuthContainer({ lng }) {
  const searchParams = useSearchParams();
  const isVerifying = searchParams.get("verify");
  const [userEmail, setUserEmail] = useState("");

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail(userEmail);
      return true;
    } catch (error) {
      console.error("Failed to resend verification email:", error);
      return false;
    }
  };

  if (isVerifying) {
    return (
      <AnimatedCheckEmailCard email={userEmail} onResend={handleResendEmail} />
    );
  }

  return (
    <AuthForm
      lng={lng}
      onEmailSubmit={(email) => {
        setUserEmail(email);
      }}
    />
  );
}
