import { getResume } from "@/actions/resumes";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/userInfo/action";
import ClientResumeTemplate from "@/components/component/render-template-view";
import { useTranslation } from "@/app/i18n";

export default async function ReviewPage({ params: { lng, resumeName } }) {
  const { t } = await useTranslation(lng, "common");
  const session = await auth();
  if (!session) redirect("/auth");
  const { user } = session;
  const resume = await getResume(user.email, resumeName);
  const userInfo = await getUser(user.email);

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
        {resume && (
          <ClientResumeTemplate
            lng={lng}
            plan={userInfo?.user?.plan}
            template={resumeName}
            resumeData={resume}
          />
        )}
      </div>
    </div>
  );
}
