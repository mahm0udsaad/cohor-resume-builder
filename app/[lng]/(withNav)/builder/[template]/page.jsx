import { Suspense } from "react";
import { auth } from "@/lib/auth";
import BuilderSkeleton from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";
import { addResumeToUser } from "@/actions/resumes";
import { ResumeBuilder } from "@/components/resume-builder";

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

  addResumeToUser(session.user.email, template);

  return (
    <div className="bg-gray-25">
      <Suspense fallback={<BuilderSkeleton />}>
        <ResumeBuilder resumeName={template} lng={lng} />
      </Suspense>
    </div>
  );
}
