"use client";

import { useState, useEffect } from "react";
import { Mail, Loader2, CheckCircle2, RefreshCw, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/app/i18n/client";
import { resendVerificationEmail } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";

export default function AnimatedCheckEmailCard({ lng }) {
  const { t } = useTranslation(lng, "auth"); // Initialize the useTranslation hook
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    setIsResending(true);
    // Simulate resending email
    await resendVerificationEmail(email);
    setIsResending(false);
    setTimeLeft(30);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    toast({
      title: t("checkInbox.sendMagicLink"),
      description: t("checkInbox.description"),
      duration: 5000,
    });
  };

  const mainColor = "#3b51a3";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-[#3b51a3]/5 to-[#3b51a3]/10 border-2 border-[#3b51a3]/20">
        <CardHeader className="text-center relative overflow-hidden pb-16 bg-[#3b51a3]">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative"
          >
            <Mail className="h-14 w-14 text-[#3b51a3]" />
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ border: "2px solid rgba(255,255,255,0.5)" }}
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {t("checkInbox.title")}
            </CardTitle>
            <p className="text-white/80">{t("checkInbox.description")}</p>
          </motion.div>
        </CardHeader>
        <CardContent className="text-center space-y-6 pt-8 relative">
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2"
                  initial={{ y: 0, x: "0%", scale: 0 }}
                  animate={{
                    y: "100vh",
                    x: `${Math.random() * 200 - 100}%`,
                    scale: Math.random() * 0.5 + 0.5,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    ease: "easeOut",
                    delay: Math.random() * 0.2,
                  }}
                  style={{
                    background: `hsl(${Math.random() * 60 + 220}, 100%, 50%)`,
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                  }}
                />
              ))}
            </motion.div>
          )}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-left block text-[#3b51a3]">
              {t("checkInbox.changeEmail")}
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="email"
                type="email"
                placeholder={t("checkInbox.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white border-[#3b51a3]/20 focus:border-[#3b51a3]"
              />
              <Button
                variant="outline"
                onClick={() => setEmail("")}
                className="px-3 bg-white border-[#3b51a3]/20 hover:bg-[#3b51a3]/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button
              variant="default"
              size="lg"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className="w-full bg-[#3b51a3] hover:bg-[#3b51a3]/90 text-white shadow-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isResending ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-2" />
                ) : timeLeft > 0 ? (
                  <RefreshCw className="h-5 w-5 mx-2 animate-spin" />
                ) : (
                  <Mail className="h-5 w-5 mx-2 animate-bounce" />
                )}
                {isResending
                  ? t("checkInbox.sending")
                  : timeLeft > 0
                  ? t("checkInbox.resendIn", { timeLeft })
                  : t("checkInbox.sendMagicLink")}
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: timeLeft > 0 ? 1 : 0,
                  opacity: timeLeft > 0 ? 0.15 : 0,
                }}
                transition={{ duration: 30, ease: "linear" }}
                style={{ originX: 0, originY: 0 }}
              />
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center justify-center space-x-2 text-sm text-[#3b51a3]/60"
          >
            <CheckCircle2 className="h-4 w-4 text-[#3b51a3] mx-2  " />
            <p>{t("checkInbox.spamCheck")}</p>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.push("/auth")}
              className="text-[#3b51a3] hover:text-[#3b51a3]/80 hover:bg-[#3b51a3]/5"
            >
              {t("checkInbox.backToSignIn")}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
