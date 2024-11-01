import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/app/i18n";
import SearchForm from "@/components/forms/search";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { getUser } from "../../../../actions/userInfo/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import { redirect } from "next/navigation";
import AutoSubscriptionModal from "@/components/cards/auto-subscription-modal";

const templates = [
  {
    category: "creativeTimeLine",
    name: "creativeTimeLine",
    image: "/templates/creativeTimeLine.png",
  },
  {
    category: "BlueHorizon",
    name: "BlueHorizon",
    image: "/templates/BlueHorizon.png",
  },
  {
    name: "elegantModern",
    image: "/templates/elegantModern.png",
  },
  {
    name: "modernFormal",
    image: "/templates/modernFormal.png",
  },
  {
    name: "bold",
    image: "/templates/bold.png",
  },
  {
    name: "professional",
    image: "/templates/professional.png",
  },
  {
    category: "gridLayout",
    name: "gridLayout",
    image: "/templates/gridLayout.png",
  },
  {
    category: "modern",
    name: "modern",
    image: "/templates/modern.png",
  },
  {
    name: "creative",
    image: "/templates/creative.png",
  },
  {
    name: "formal",
    image: "/templates/formal.png",
  },
  {
    category: "glow",
    name: "glow",
    image: "/templates/glow.png",
  },
  {
    name: "elegant",
    image: "/templates/elegant.png",
  },
  {
    category: "ProfessionalSidebar",
    name: "ProfessionalSidebar",
    image: "/templates/ProfessionalSidebar.png",
  },
  {
    name: "minimal",
    image: "/templates/minimal.png",
  },
  {
    category: "classic",
    name: "classic",
    image: "/templates/classic.png",
  },
];

export default async function TemplateGallery({
  params: { lng },
  searchParams,
}) {
  const { t } = await useTranslation(lng, "common");
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = await getUser(session?.user.email);

  // Function to get available templates based on user plan
  const getAvailableTemplates = (userPlan) => {
    switch (userPlan) {
      case "proPlus":
        return templates; // All templates
      case "pro":
        return templates.slice(0, 10); // First 10 templates
      case "free":
      default:
        return templates.slice(0, 2); // First 2 templates
    }
  };

  const availableTemplates = getAvailableTemplates(user?.plan);
  const showUpgradeAlert = !user?.plan || user.plan === "free";
  const showPricing = searchParams?.hasOwnProperty("showPricing");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("galleryHeader.title")}
          </h1>
          <Link href="/" className="text-blue-600">
            <div className="coursor-pointer rounded-md transition delay-300 hover:shadow-lg hover:bg-[#3b51a3] hover:text-white group w-[16rem] h-[2.5rem] flex justify-center items-center">
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
        <SearchForm lng={lng} />
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
                      href="?showPricing=true"
                      className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>{t("upgradeAlert.actionText")}</span>
                      <svg
                        className={`w-4 h-4 ms-1 rtl:rotate-180 transition-transform group-hover:translate-x-1`}
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
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableTemplates.map((template) => (
              <Link
                key={template.name}
                href={`/builder/${template.name}`}
                className="group"
                prefetch={false}
              >
                <div className="overflow-hidden rounded-lg bg-background shadow transition-all">
                  <div className="aspect-[3/4] overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.name}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="transition-all group-hover:scale-[0.9] duration-300"
                    />
                  </div>
                  <div className="bg-main px-4 pb-2 flex justify-between items-center">
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {template.name}
                    </h3>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <AutoSubscriptionModal defaultOpen={showPricing} user={user} lng={lng} />
    </div>
  );
}
