"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "@/app/i18n/client";

export const MagicLinkButton = ({ lng }) => {
  const { t } = useTranslation(lng, "auth");
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b51a3] hover:bg-[#2a3b7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b51a3]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("sending")}
        </>
      ) : (
        t("sendMagicLink")
      )}
    </Button>
  );
};
export function AuthButton({ lng, searchParams, isLoading }) {
  const { t } = useTranslation(lng, "auth");

  return (
    <Button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b51a3] hover:bg-[#2a3b7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b51a3]"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("loading")}
        </div>
      ) : searchParams?.register ? (
        t("signUp")
      ) : (
        t("signIn")
      )}
    </Button>
  );
}
export const GoogleSignInButton = ({ lng }) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation(lng, "auth");

  return (
    <Button
      disabled={pending}
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <span className="sr-only">{t("signInWithGoogle")}</span>
          <GoogleLogo />
        </>
      )}
    </Button>
  );
};

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
