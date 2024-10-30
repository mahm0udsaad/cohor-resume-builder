import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/app/i18n";
import SearchForm from "@/components/forms/search";
import Image from "next/image";

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

export default async function TemplateGallery({ params: { lng } }) {
  const { t } = await useTranslation(lng, "common");

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
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Link
                key={template.name} // Ensure this is unique and stable
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
                      className={
                        "transition-all group-hover:scale-[0.9] duration-300"
                      }
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
    </div>
  );
}
