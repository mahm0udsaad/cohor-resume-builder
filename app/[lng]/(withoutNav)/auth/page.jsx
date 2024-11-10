import { useTranslation } from "@/app/i18n";
import Logo from "@/components/component/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AnimatedCheckEmailCard from "@/components/cards/verfy-card";
import { Button } from "@/components/ui/button";
import {
  GoogleSignInButton,
  MagicLinkButton,
} from "../../../../components/btns/auth-btns";

export default async function AuthPage({ params: { lng }, searchParams }) {
  const { t } = await useTranslation(lng, "auth");
  const session = await auth();
  const isVerifying = searchParams.verifying;

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header section remains the same */}
      {isVerifying ? (
        <AnimatedCheckEmailCard lng={lng} />
      ) : (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Link
              href="/"
              className="flex justify-center mr-6 items-center mb-5 text-[#3b51a3] hover:text-[#2a3b7a]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToHome")}
            </Link>
            <div className="flex justify-center items-center">
              <Logo />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("signInTitle")}
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
              <form
                action={async (formData) => {
                  "use server";
                  const email = formData.get("email");
                  console.log(email);

                  await signIn("nodemailer", {
                    email,
                    callbackUrl: "/dashboard",
                  });
                }}
                className="space-y-6"
              >
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
                  <MagicLinkButton lng={lng} />
                </div>
              </form>

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
            </div>
          </div>
        </>
      )}
    </div>
  );
}
const GoogleLogo = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="-3 0 262 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
};
