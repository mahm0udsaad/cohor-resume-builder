import { getUserWithDetails } from "@/actions/userInfo/action";
import { ResumeDashboard } from "@/components/resume-dashboard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  const userInfo = await getUserWithDetails();
  const user = userInfo.user;
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;

  return (
    <div className=" p-6 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3b51a3]">Resume Dashboard</h1>
        <Button variant="outline" className="flex items-center gap-2 p-4">
          <span>{user.name}</span>
        </Button>
      </div>
      <ResumeDashboard
        initialUserInfo={{
          personalInfo,
          experiences,
          educations,
          skills,
          languages,
          courses,
        }}
      />
    </div>
  );
};
export default DashboardPage;
