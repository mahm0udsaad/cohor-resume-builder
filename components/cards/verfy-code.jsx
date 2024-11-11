"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckEmailPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const resendEmail = () => {
    setEmailSent(true);
    setCountdown(60);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulating verification process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setIsVerified(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
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
                Check Your Email
              </h1>
              <p className="text-blue-100 relative z-10">
                We&apos;ve sent a verification code to your email
              </p>
            </motion.div>
          </div>
          <div className="p-6">
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
                    Enter the 6-digit verification code below:
                  </p>
                  <div className="flex justify-center space-x-2 mb-6">
                    {code.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        className="w-12 h-12 text-center text-2xl"
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
                      <ArrowRight className="mr-2 h-4 w-4" />
                    )}
                    {isVerifying ? "Verifying..." : "Verify Code"}
                  </Button>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Didn&apos;t receive the email?
                    </p>
                    <Button
                      variant="link"
                      className="text-[#3b51a3] p-0 h-auto font-normal"
                      onClick={resendEmail}
                      disabled={countdown > 0}
                    >
                      {countdown > 0
                        ? `Resend in ${countdown}s`
                        : "Resend Email"}
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
                    Verification Successful!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your email has been verified. You can now proceed.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Continue to Dashboard
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      {emailSent && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Email sent successfully!
        </motion.div>
      )}
    </div>
  );
}
