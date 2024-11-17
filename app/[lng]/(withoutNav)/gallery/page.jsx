import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { useTranslation } from "@/app/i18n";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { templates } from "@/data/data";
import { getUserPlanTemplates } from "@/actions/resumes/";
import dynamic from "next/dynamic";

const AutoSubscriptionModal = dynamic(
  () => import("@/components/cards/auto-subscription-modal"),
  { ssr: false },
);

async function TemplateGallery({ params: { lng }, searchParams }) {
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = session;
  const { t } = await useTranslation(lng, "common");
  const userPlanTemplates = await getUserPlanTemplates(user?.plan || "free");
  const showUpgradeAlert =
    user?.plan !== "proPlus" || searchParams?.hasOwnProperty("showPricing");
  const availableTemplates = templates.filter((template) =>
    userPlanTemplates.includes(template.name),
  );
  const lockedTemplates = templates.filter(
    (template) => !userPlanTemplates.includes(template.name),
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("galleryHeader.title")}
          </h1>
          <Link href="/" className="text-blue-600">
            <div className="cursor-pointer rounded-md transition delay-300 hover:shadow-lg hover:bg-[#3b51a3] hover:text-white group w-64 h-10 flex justify-center items-center">
              <ArrowLeft
                className={`mx-2 h-4 w-4 transition-transform ${
                  lng === "ar"
                    ? "group-hover:-translate-x-2"
                    : "group-hover:translate-x-2"
                }`}
              />
              <span className="group-hover:hidden">
                {t("galleryHeader.backToHome")}
              </span>
            </div>
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showUpgradeAlert && (
            <div className="px-4 mb-8 sm:px-0">
              <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <RocketIcon className="h-5 w-5 text-blue-600 animate-bounce mt-[0.4rem]" />
                  <div className="flex-1">
                    <AlertTitle className="text-lg font-semibold text-blue-900 mb-1">
                      {t("upgradeAlert.title")}
                    </AlertTitle>
                    <AlertDescription className="text-blue-800">
                      <span className="block mb-2">
                        {t("upgradeAlert.description")}
                      </span>
                      <Link
                        href="/#pricing"
                        className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>{t("upgradeAlert.actionText")}</span>
                        <svg
                          className="w-4 h-4 ms-1 rtl:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableTemplates.map((template) => (
              <Link
                key={template.name}
                href={`/builder/${template.name}`}
                prefetch={false}
              >
                <div className="group overflow-hidden rounded-lg bg-background shadow transition-all hover:shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.name}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="transition-all group-hover:scale-[0.8] duration-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
            {lockedTemplates.map((template) => (
              <div
                key={template.name}
                className="cursor-not-allowed relative group"
              >
                <div className="overflow-hidden rounded-lg bg-background shadow transition-all opacity-75">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-white mb-2" />
                      <span className="text-white font-medium text-sm">
                        Upgrade to unlock
                      </span>
                    </div>
                    <Image
                      src={template.image}
                      alt={template.name}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="filter grayscale"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AutoSubscriptionModal lng={lng} user={user} />
    </div>
  );
}

export default TemplateGallery;
