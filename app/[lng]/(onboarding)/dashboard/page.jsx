import { getUserWithDetails } from "@/actions/userInfo/action";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardWithSidebarComponent } from "@/components/dashboard-with-sidebar";
import { getUserResumes } from "@/actions/resumes";
import { EditingProvider } from "@/context/edit-context";
import { getUserSubscription } from "@/actions/subscriptions";
const DashboardPage = async ({ params: { lng } }) => {
  const session = await auth();
  if (!session) redirect("/auth");
  const userInfo = await getUserWithDetails(session.user.email);
  const resumes = await getUserResumes(session.user.email);
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;
  const subscriptions = await getUserSubscription(session.user.email);
  return (
    <EditingProvider>
      <DashboardWithSidebarComponent
        lng={lng}
        resumes={resumes}
        user={userInfo?.user}
        subscriptions={subscriptions}
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
