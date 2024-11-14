import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Layout,
  Send,
  Zap,
  Download,
} from "lucide-react";
import { useTranslation } from "@/app/i18n";
import PricingSection from "@/components/component/pricing-section";
import { Suspense } from "react";
import { PricingSkeleton } from "@/components/skeleton/pricing";
export async function LandingPageComponent({ lng }) {
  const { t } = await useTranslation(lng, "common");
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#3b51a3]" />,
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      icon: <Zap className="w-6 h-6 text-[#3b51a3]" />,
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: <Download className="w-6 h-6 text-[#3b51a3]" />,
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
  ];
  const steps = [
    {
      icon: <Layout className="w-12 h-12 text-white" />,
      title: t("steps.0.title"),
      description: t("steps.0.description"),
    },
    {
      icon: <FileText className="w-12 h-12 text-white" />,
      title: t("steps.1.title"),
      description: t("steps.1.description"),
    },
    {
      icon: <Send className="w-12 h-12 text-white" />,
      title: t("steps.2.title"),
      description: t("steps.2.description"),
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Header Section */}
        <section className="container mx-auto py-20 px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl text-[#3b51a3]">
                {t("header.title")}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                {t("header.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#3b51a3] hover:bg-[#2a3b7a] text-white"
                  asChild
                >
                  <Link href="/gallery">{t("header.ctaStartBuilding")}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#3b51a3] text-[#3b51a3] hover:bg-[#3b51a3] hover:text-white"
                  asChild
                >
                  <Link href="#">{t("header.ctaLearnMore")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b51a3] to-[#2a3b7a] opacity-20 rounded-3xl transform rotate-3"></div>
              <Image
                priority
                src="/header.jpg"
                alt="Hero"
                width={600}
                height={400}
                className="rounded-3xl shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-300"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#3b51a3]">
              {t("featuresTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="bg-[#3b51a3]/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3b51a3]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section id="how-it-works" className="py-20 bg-[#3b51a3] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("stepsTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="bg-white/10 rounded-full p-4 mb-4 transition-all duration-300 group-hover:bg-white/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="group bg-white text-[#3b51a3] hover:bg-gray-100 transition-all duration-300"
                asChild
              >
                <Link href="/gallery">
                  <span className="group-hover:text-gray-100">
                    {t("stepsCta")}
                  </span>
                  <ArrowRight
                    className={`mx-2 h-4 w-4 transition-transform -translate-x-3 ${
                      lng === "ar"
                        ? "group-hover:translate-x-14"
                        : "group-hover:-translate-x-14"
                    }`}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Suspense fallback={<PricingSkeleton />}>
          <PricingSection t={t} lng={lng} />
        </Suspense>
      </main>
    </div>
  );
}
