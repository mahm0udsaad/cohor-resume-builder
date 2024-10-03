import { useTranslation } from "@/app/i18n";
import Logo from "@/components/component/logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "@/lib/auth";
import { ArrowLeft, ChromeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthPage({ params: { lng } }) {
  const { t } = await useTranslation(lng, "auth");
  const session = await auth();

  if (session) {
    redirect("/");
  }

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
          <form className="space-y-6">
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
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b51a3] hover:bg-[#2a3b7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b51a3]"
              >
                {t("sendMagicLink")}
              </Button>
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

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <Button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">{t("signInWithGoogle")}</span>
                    <ChromeIcon />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
