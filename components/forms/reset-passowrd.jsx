"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle, RefreshCw, Lock } from "lucide-react";
import {
  initiatePasswordReset,
  verifyEmail,
  resetPassword,
} from "@/actions/auth/reset-passowrd";
import { useTranslation } from "@/app/i18n/client";

export default function PasswordResetFlow({ lng }) {
  const { t } = useTranslation(lng, "auth");
  const [currentStep, setCurrentStep] = useState("forgot");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const firstInputRef = useRef(null);
  const inputRefs = useRef([]);
  const router = useRouter();
  // Forgot Password Form Handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await initiatePasswordReset(formData);
      if (result.success) {
        setCurrentStep("verify");
        startCountdown();
      } else {
        setError(t("ResetInitiationFailed"));
      }
    } catch (err) {
      setError(t("unknownError"));
    } finally {
      setIsLoading(false);
    }
  };
  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase(); // Convert to uppercase
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length > 1) {
      // Handle pasting into a single input field
      const chars = value.toUpperCase().split("").slice(0, 6);
      const newCode = [...code];
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);

      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = newCode.findIndex((char, i) => i > index && !char);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  // Enhanced paste handler for the container
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().toUpperCase();
    const chars = pastedData.split("").slice(0, 6);
    const newCode = Array(6).fill("");
    chars.forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newCode.findIndex((char) => !char);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
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
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);
  const handleResendEmail = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await initiatePasswordReset(formData);
      if (result.success) {
        startCountdown();
      } else {
        setError(t(result.error));
      }
    } catch (err) {
      setError(t("unknownError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code.join(""));
    formData.append("type", "PASSWORD_RESET");

    try {
      const result = await verifyEmail(formData);
      if (result.success) {
        setCurrentStep("reset");
      } else {
        setError(t(result.error));
      }
    } catch (err) {
      setError(t("unknownError"));
    } finally {
      setIsVerifying(false);
    }
  };

  // Reset Password Form Handler
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("email", email);

    setIsLoading(true);
    setError("");

    try {
      const result = await resetPassword(formData);
      if (result.success) {
        router.push(`/auth`);
      } else {
        setError(t(result.error));
      }
    } catch (err) {
      setError(t("unknownError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === "forgot" && (
        <motion.div
          key="forgot"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-[#3b51a3] mx-auto mb-4" />
                <h1 className="text-2xl font-bold">{t("forgotPassword")}</h1>
                <p className="text-gray-600 mt-2">{t("forgotPasswordDesc")}</p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3b51a3]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  {t("sendResetLink")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {currentStep === "verify" && (
        <motion.div
          key="verify"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl">
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
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={6} // Allow pasting multiple characters
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-2xl uppercase"
                      style={{ textTransform: "uppercase" }}
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {currentStep === "reset" && (
        <motion.div
          key="reset"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-[#3b51a3] mx-auto mb-4" />
                <h2 className="text-xl font-bold">{t("resetPassword")}</h2>
                <p className="text-gray-600 mt-2">{t("enterNewPassword")}</p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">{t("newPassword")}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">
                    {t("confirmPassword")}
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3b51a3]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  {t("resetPassword")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
