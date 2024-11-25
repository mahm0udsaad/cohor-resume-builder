import { Suspense } from "react";
import { auth } from "@/lib/auth";
import BuilderSkeleton from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";
import { ResumeBuilder } from "@/components/resume-builder";
import { getUserWithDetails } from "@/actions/userInfo/action";
import { getPlansWithPrices } from "@/actions/resumes/plans";

export const dynamic = "force-dynamic";
export default async function TemplatePage({ params: { template, lng } }) {
  const session = await auth();
  const plans = await getPlansWithPrices();
  if (!session) {
    redirect("/auth");
  }

  // Fetch user-specific data
  const data = await getUserWithDetails(session.user.email);

  return (
    <div className="bg-gray-25">
      <Suspense fallback={<BuilderSkeleton />}>
        <ResumeBuilder
          plans={plans}
          initialData={data}
          resumeName={template}
          lng={lng}
          user={data.user}
        />
      </Suspense>
    </div>
  );
}
