import { Suspense } from "react";
import { auth } from "@/lib/auth";
import ClientTemplateWrapper from "@/components/wrappers/Template-wrapper";
import { ResumeSkeleton } from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";

// This runs at build time
export async function generateStaticParams() {
  const languages = ["en", "ar"];
  const templates = ["classic", "modern", "bold"];

  const params = [];
  for (const lng of languages) {
    for (const template of templates) {
      params.push({
        lng,
        template,
      });
    }
  }

  return params;
}

// Server Component
export default async function TemplatePage({ params: { template, lng } }) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="bg-gray-25">
      <Suspense fallback={<ResumeSkeleton />}>
        <ClientTemplateWrapper template={template} lng={lng} />
      </Suspense>
    </div>
  );
}
