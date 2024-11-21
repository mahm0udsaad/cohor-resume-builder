import { Suspense } from "react";
import { auth } from "@/lib/auth";
import BuilderSkeleton from "@/components/skeleton/builder-loader";
import { redirect } from "next/navigation";
import { addResumeToUser } from "@/actions/resumes";
import { ResumeBuilder } from "@/components/resume-builder";
import { getUserWithDetails } from "@/actions/userInfo/action";

export async function generateStaticParams() {
  const languages = ["en", "ar"];
  const templates = ["classic", "modern", "bold"];

  const params = [];
  for (const lng of languages) {
    for (const template of templates) {
      params.push({ lng, template });
    }
  }

  return params;
}

export default async function TemplatePage({ params: { template, lng } }) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  // Add resume to the user's collection (conditionally)
  try {
    await addResumeToUser(session.user.email, template);
  } catch (error) {
    console.error("Failed to add resume:", error);
  }

  // Fetch user-specific data
  const data = await getUserWithDetails(session.user.email);

  return (
    <div className="bg-gray-25">
      <Suspense fallback={<BuilderSkeleton />}>
        <ResumeBuilder
          initialData={data}
          resumeName={template}
          lng={lng}
          user={data.user}
        />
      </Suspense>
    </div>
  );
}
