"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./logo";
import { useTranslation } from "../../app/i18n/client";
import { auth, googleProvider } from "../../firebase/client"; // Import Firebase auth methods
import { signInWithPopup, sendSignInLinkToEmail, getAuth } from "firebase/auth";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { storeUser } from "@/actions/auth/actions";

export function SignInPageComponent({ lng }) {
  const { t } = useTranslation(lng, "auth");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  // Handle email verification
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/verify", // Your verification URL
        handleCodeInApp: true,
      };
      // Send sign-in link to email
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email); // Store the email locally
      setMessage(t("magicLinkSent")); // Message after sending verification link
    } catch (error) {
      console.error("Error sending email link", error);
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      storeUser(user);
      router.refresh();
      setMessage(t("signInSuccess"));
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the Google Sign-In popup.");
      } else {
        console.error("Error during Google Sign-In", error);
        setMessage(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          <form className="space-y-6" onSubmit={handleEmailSignIn}>
            <div>
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3b51a3] focus:border-[#3b51a3] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b51a3] hover:bg-[#2a3b7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b51a3]"
              >
                {isLoading ? t("sending") : t("sendMagicLink")}
              </Button>
            </div>
          </form>

          {message && (
            <div className="mt-3 text-sm text-center text-green-600">
              {message}
            </div>
          )}

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

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">{t("signInWithGoogle")}</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="#e50000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.120 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.120 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.120z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
