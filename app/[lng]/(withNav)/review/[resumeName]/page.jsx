import { getResume } from "@/actions/resumes";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/userInfo/action";
import ClientResumeTemplate from "@/components/component/render-template-view";

export default async function ReviewPage({ params: { lng, resumeName } }) {
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = session;
  const resume = await getResume(user.email, resumeName);
  const userInfo = await getUser(user.email);

  return (
    <div className="bg-gray-50 min-h-[90dvh] overflow-x-hidden">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h1 className="text-center text-3xl font-bold text-[#3b51a3]">
              Review Resume: {resumeName}
            </h1>
          </div>
          <Link
            href={`/builder/${resumeName}?tab=review`}
            className="z-10 flex items-center gap-2 text-[#3b51a3] hover:underline"
          >
            Back to Editing
          </Link>
        </div>
        {resume && (
          <ClientResumeTemplate
            lng={lng}
            plan={userInfo?.user.plan}
            template={resumeName}
            resumeData={resume}
          />
        )}
      </div>
    </div>
  );
}
