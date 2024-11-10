import { getUserWithDetails } from "@/actions/userInfo/action";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardWithSidebarComponent } from "@/components/dashboard-with-sidebar";
import { getUserResumes } from "@/actions/resumes";
import { EditingProvider } from "@/context/edit-context";

const DashboardPage = async ({ params: { lng } }) => {
  const session = await auth();
  if (!session) redirect("/auth");
  const userInfo = await getUserWithDetails(session.user.email);
  const resumes = await getUserResumes(session?.user.id);
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;

  console.log(userInfo);

  return (
    <EditingProvider>
      <DashboardWithSidebarComponent
        lng={lng}
        resumes={resumes}
        user={userInfo?.user}
        resumeData={{
          personalInfo,
          experiences,
          educations,
          skills,
          languages,
          courses,
        }}
      />
    </EditingProvider>
  );
};
export default DashboardPage;
