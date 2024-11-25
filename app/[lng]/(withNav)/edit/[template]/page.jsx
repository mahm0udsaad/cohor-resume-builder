import { Suspense } from "react";
import { auth } from "@/lib/auth";
import BuilderSkeleton from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";
import { ResumeBuilder } from "@/components/resume-builder";
import { getResume } from "@/actions/resumes";
import { getPlansWithPrices } from "@/actions/resumes/plans";

export const dynamic = "force-dynamic";
export default async function TemplatePage({ params: { template, lng } }) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const plans = await getPlansWithPrices();
  const data = await getResume(session.user.email, template);

  return (
    <div className="bg-gray-25">
      <Suspense fallback={<BuilderSkeleton />}>
        <ResumeBuilder
          initialData={data.resume}
          plans={plans}
          user={data.user}
          resumeName={template}
          lng={lng}
        />
      </Suspense>
    </div>
  );
}
