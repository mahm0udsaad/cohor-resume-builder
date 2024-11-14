"use client";
import { useTranslation } from "@/app/i18n/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleCredentialsAuth, register } from "@/actions/auth/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AuthButton } from "../btns/auth-btns";
import Link from "next/link";

export default function AuthForm({ lng, searchParams }) {
  const { t } = useTranslation(lng, "auth");
  const isRegistering = searchParams.register;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAuthError = (error) => {
    switch (error) {
      case "InvalidPassword":
        toast({
          title: t("invalidPassword"),
          variant: "destructive",
        });
        break;
      case "UserNotFound":
        toast({
          title: t("userNotFound"),
          variant: "destructive",
        });
        break;
      case "CredentialsSignin":
        toast({
          title: t("invalidCredentials"),
          variant: "destructive",
        });
        break;
      default:
        toast({
          title: t("unknownError"),
          variant: "destructive",
        });
    }
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    if (!isRegistering) {
      try {
        const result = await handleCredentialsAuth(formData);

        if (result?.error) {
          handleAuthError(result.error);
        } else {
          toast({
            title: t("loginSuccess"),
            variant: "success",
            description: t("loginSuccessDesc"),
          });
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Auth error:", err);
        toast({
          title: t("unknownError"),
          variant: "destructive",
        });
      }
    } else {
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
        console.error("Registration error:", err);
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
      <Link
        href={"/auth/forgot-password"}
        className="text-gray-500 text-sm hover:underline"
      >
        {t("forgotPassword")}
      </Link>
      <AuthButton lng={lng} searchParams={searchParams} isLoading={isLoading} />
    </form>
  );
}
