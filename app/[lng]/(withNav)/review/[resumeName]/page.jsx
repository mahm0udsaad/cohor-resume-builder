import { getResume } from "@/actions/resumes";
import ClientResumeTemplate from "@/components/component/render-template";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ReviewPage({ params: { resumeName } }) {
  const user = await auth();
  const resume = await getResume(user.id, resumeName);

  return (
    <div className="bg-gray-50 min-h-[90dvh]">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3b51a3]">
            Review Resume: {resumeName}
          </h1>
          <Link
            href="/builder/modern?tab=review"
            className="flex items-center gap-2 text-[#3b51a3] hover:underline"
          >
            Back to Editing
          </Link>
        </div>
        <ClientResumeTemplate templateName={resumeName} data={resume} />
      </div>
    </div>
  );
}
