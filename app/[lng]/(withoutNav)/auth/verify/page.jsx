"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { verifyEmail, resendVerification } from "@/actions/auth/actions";
import { useTranslation } from "@/app/i18n/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUserOnboardingStatus } from "@/actions/userInfo/action";

export default function CheckEmailPage({ params: { lng } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation(lng, "auth");
  const email = searchParams.get("email");
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (!isVerified) {
      firstInputRef.current?.focus();
    }
  }, [isVerified]);

  // Improved code change handler
  const handleCodeChange = (index, value) => {
    // Allow only numbers and uppercase letters
    const sanitizedValue = value.replace(/[^0-9A-Z]/g, "").slice(0, 1);

    const newCode = [...code];
    newCode[index] = sanitizedValue;
    setCode(newCode);

    // If we have a value and we're not at the last input, focus next input
    if (sanitizedValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Enhanced paste handler
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().toUpperCase();
    const chars = pastedData
      .replace(/[^0-9A-Z]/g, "")
      .split("")
      .slice(0, 6);
    const newCode = [...code];

    chars.forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((char) => !char);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Improved key handler for better tablet support
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newCode = [...code];

      if (newCode[index]) {
        // If current input has a value, clear it
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // If current input is empty and we're not at the first input,
        // clear previous input and move focus there
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);

      const result = await resendVerification(formData);

      if (result.success) {
        setResendSuccess(true);
        setCountdown(60);
        setTimeout(() => setResendSuccess(false), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t("resendError"));
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", code.join(""));

      const result = await verifyEmail(formData);

      if (result.success) {
        setIsVerified(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        const onboardingStatus = await getUserOnboardingStatus(email);
        if (onboardingStatus) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t("verificationError"));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-4"
      dir={lng === "ar" ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-0">
          <div className="bg-[#3b51a3] p-6 text-white text-center relative overflow-hidden">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Mail className="w-48 h-48 opacity-10" />
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold mb-2 relative z-10">
                {t("checkEmail")}
              </h1>
              <p className="text-blue-100 relative z-10">
                {t("verificationCodeSent")}
              </p>
            </motion.div>
          </div>
          <div className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-600 mb-6 text-center">
                    {t("enterVerificationCode")}
                  </p>
                  <div
                    className="flex justify-center space-x-2 mb-6"
                    dir="ltr"
                    onPaste={handlePaste}
                  >
                    {code.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                          if (index === 0) firstInputRef.current = el;
                        }}
                        type="text"
                        inputMode="text"
                        pattern="[0-9A-Za-z]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value.toUpperCase())
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-2xl"
                        autoComplete="off"
                      />
                    ))}
                  </div>
                  <Button
                    className="w-full bg-[#3b51a3] hover:bg-[#4b61b3] text-white"
                    onClick={handleVerify}
                    disabled={isVerifying || code.join("").length !== 6}
                  >
                    {isVerifying ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight
                        className={`${lng === "ar" ? "ml-2" : "mr-2"} h-4 w-4`}
                      />
                    )}
                    {isVerifying ? t("verifying") : t("verifyCode")}
                  </Button>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {t("noCodeReceived")}
                    </p>
                    <Button
                      variant="link"
                      className="text-[#3b51a3] p-0 h-auto font-normal"
                      onClick={handleResendEmail}
                      disabled={countdown > 0}
                    >
                      {countdown > 0
                        ? t("resendCountdown").replace("{seconds}", countdown)
                        : t("resendEmail")}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {t("verificationSuccess")}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {t("verificationSuccessMessage")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      {resendSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          {t("emailSentSuccess")}
        </motion.div>
      )}
    </div>
  );
}
