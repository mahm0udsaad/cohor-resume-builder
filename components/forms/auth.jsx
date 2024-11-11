"use client";
import { useTranslation } from "@/app/i18n/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleCredentialsAuth, register } from "@/actions/auth/actions";
import { getUserOnboardingStatus } from "@/actions/userInfo/action";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { AuthButton } from "../btns/auth-btns";

export default function AuthForm({ lng, searchParams }) {
  const { t } = useTranslation(lng, "auth");
  const isRegistering = searchParams.register;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    if (formData.get("register")) {
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        toast({
          title: t("passwordMismatch"),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        const result = await register(formData);
        if (result.error) {
          toast({
            title: t(result.error),
            variant: "destructive",
          });
        } else {
          router.push(result.redirectPath, undefined, {
            statusCode: result.redirectStatus,
          });
          toast({
            title: t("registrationSuccess"),
            variant: "default",
          });
        }
      } catch (err) {
        toast({
          title: t("unknownError"),
          variant: "destructive",
        });
      }
    } else {
      try {
        const result = await handleCredentialsAuth(formData);

        if (result?.error) {
          toast({
            title: t(result.error),
            variant: "destructive",
          });
        } else {
          const onboardingStatus = await getUserOnboardingStatus(result);
          if (onboardingStatus) {
            redirect("/dashboard");
          } else {
            redirect("/onboarding");
          }
        }
      } catch (err) {
        toast({
          title: t("unknownError"),
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <input
        type="hidden"
        name="register"
        value={isRegistering ? "true" : ""}
      />

      <div>
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3b51a3] focus:border-[#3b51a3] sm:text-sm"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3b51a3] focus:border-[#3b51a3] sm:text-sm"
          />
        </div>
      </div>

      {isRegistering && (
        <div>
          <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
          <div className="mt-1">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3b51a3] focus:border-[#3b51a3] sm:text-sm"
            />
          </div>
        </div>
      )}

      <AuthButton lng={lng} searchParams={searchParams} isLoading={isLoading} />
    </form>
  );
}
