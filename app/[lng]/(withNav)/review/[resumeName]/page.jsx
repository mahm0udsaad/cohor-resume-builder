import { getResume } from "@/actions/resumes";
import dynamic from "next/dynamic";
import { DownloadBtn } from "@/components/download-btn";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { dummyData } from "@/data/data";

const ClientResumeTemplate = dynamic(
  () => import("@/components/component/render-template-view"),
  {
    ssr: false,
    loading: () => <Skeleton className={"w-full h-screen"} />,
  },
);

export default async function ReviewPage({ params: { resumeName } }) {
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = session;
  const resume = await getResume(user.email, resumeName);

  return (
    <div className="bg-gray-50 min-h-[90dvh]">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/builder/modern?tab=review"
            className="flex items-center gap-2 text-[#3b51a3] hover:underline"
          >
            Back to Editing
          </Link>
          <h1 className="text-3xl font-bold text-[#3b51a3]">
            Review Resume: {resumeName}
          </h1>
          <DownloadBtn />
        </div>
        {resume && (
          <ClientResumeTemplate templateName={resumeName} data={dummyData} />
        )}
      </div>
    </div>
  );
}
