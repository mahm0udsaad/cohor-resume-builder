import { Suspense } from "react";
import { auth } from "@/lib/auth";
import BuilderSkeleton from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";
import { ResumeBuilder } from "@/components/resume-builder";
import { getResume } from "@/actions/resumes";

export default async function TemplatePage({ params: { template, lng } }) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const data = await getResume(session.user.email, template);
  return (
    <div className="bg-gray-25">
      <Suspense fallback={<BuilderSkeleton />}>
        <ResumeBuilder initalData={data} resumeName={template} lng={lng} />
      </Suspense>
    </div>
  );
}
