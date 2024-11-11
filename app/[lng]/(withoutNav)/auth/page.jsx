import { useTranslation } from "@/app/i18n/";
import Logo from "@/components/component/logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/btns/auth-btns";
import AuthForm from "../../../../components/forms/auth";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthPage({ params: { lng }, searchParams }) {
  const { t } = await useTranslation(lng, "auth");
  const isRegistering = searchParams.register;
  const session = await auth();

  if (session) {
    const { getUserOnboardingStatus } = await import(
      "@/actions/userInfo/action"
    );
    const hasCompletedOnboarding = await getUserOnboardingStatus(
      session.user.email,
    );

    if (hasCompletedOnboarding) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="flex gap-4 w-full justify-between">
        <Link
          href="/"
          className="flex justify-center underline mr-6 items-center mb-5 text-white hover:text-[#2a3b7a]"
        >
          <ArrowLeft className="mx-2 h-4 w-4" />
          {t("backToHome")}
        </Link>
        <div className="flex justify-center items-center">
          <Logo />
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          {isRegistering ? t("signUpTitle") : t("signInTitle")}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <AuthForm lng={lng} searchParams={searchParams} />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-y-3">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <GoogleSignInButton lng={lng} />
              </form>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            {isRegistering ? (
              <p>
                {t("alreadyHaveAccount")}{" "}
                <Link
                  href="/auth"
                  className="font-medium text-[#3b51a3] hover:text-[#2a3b7a]"
                >
                  {t("signIn")}
                </Link>
              </p>
            ) : (
              <p>
                {t("noAccount")}{" "}
                <Link
                  href="/auth?register=true"
                  className="font-medium text-[#3b51a3] hover:text-[#2a3b7a]"
                >
                  {t("signUp")}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
