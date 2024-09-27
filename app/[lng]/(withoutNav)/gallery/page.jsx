import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import Resume from "@/components/templates/classic"; // Direct import for Classic template
import ModifiedResumeTemplate from "@/components/templates/modern"; // Direct import for Modern template
import { dummyData } from "@/data/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SearchForm from "@/components/forms/search";
import { useTranslation } from "@/app/i18n";

const TemplateGallery = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "common");
  const templates = [
    { category: "classic", name: "classic", Component: Resume },
    { category: "classic", name: "classic", Component: Resume },
    { category: "modern", name: "modern", Component: ModifiedResumeTemplate },
    { category: "modern", name: "modern", Component: ModifiedResumeTemplate },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("galleryHeader.title")}
          </h1>
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("galleryHeader.backToHome")}
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <SearchForm lng={lng} />
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Link
                href={`/builder/${template.name}`}
                className="group "
                prefetch={false}
              >
                <div className="overflow-hidden rounded-lg bg-background shadow transition-all">
                  <div className="aspect-[3/4] overflow-hidden">
                    <template.Component
                      resumeData={dummyData}
                      className={
                        "scale-[0.7] transition-all group-hover:scale-[0.9] duration-300"
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
};

export default TemplateGallery;
