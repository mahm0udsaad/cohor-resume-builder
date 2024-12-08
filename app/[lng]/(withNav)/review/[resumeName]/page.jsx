import { getResume } from "@/actions/resumes";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClientResumeTemplate from "@/components/component/render-template-view";
import { useTranslation } from "@/app/i18n";

export default async function ReviewPage({ params: { lng, resumeName } }) {
  const { t } = await useTranslation(lng, "common");
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = session;
  const data = await getResume(user.email, resumeName);

  return (
    <div className="bg-gray-50 min-h-[90dvh] overflow-x-hidden">
      <div className="container mx-auto p-6">
        <div className="flex justify-end items-center mb-6">
          <Link
            href={`/builder/${resumeName}?tab=review`}
            className="z-10 flex items-center gap-2 text-[#3b51a3] hover:underline"
          >
            {t("Back_to_Editing")}
          </Link>
        </div>
        {data?.user?.plan === "free" && (
          <div className="p-4 my-2 bg-yellow-100 rounded-lg border border-yellow-300">
            <p className="text-sm text-yellow-800">
              {t("Free_Plan_Limitation_Description")}
            </p>
          </div>
        )}
        {data && (
          <ClientResumeTemplate
            lng={lng}
            plan={data?.user?.plan}
            template={resumeName}
            resumeData={data.resume}
          />
        )}
      </div>
    </div>
  );
}
