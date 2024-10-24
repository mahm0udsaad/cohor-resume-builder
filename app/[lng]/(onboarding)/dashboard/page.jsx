import { getUserWithDetails } from "@/actions/userInfo/action";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardWithSidebarComponent } from "@/components/dashboard-with-sidebar";
import { getUserResumes } from "@/actions/resumes";

const DashboardPage = async ({ params: { lng }, searchParams }) => {
  const session = await auth();
  if (!session) redirect("/auth");
  const userInfo = await getUserWithDetails(session.user.email);
  const resumes = await getUserResumes(session?.user.id);
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;

  return (
    <DashboardWithSidebarComponent
      lng={lng}
      resumes={resumes}
      user={session?.user}
      resumeData={{
        personalInfo,
        experiences,
        educations,
        skills,
        languages,
        courses,
      }}
    />
  );
};
export default DashboardPage;
