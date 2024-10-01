import { getCurrentUser, getUserWithDetails } from "@/actions/userInfo/action";
import { ResumeDashboard } from "@/components/resume-dashboard";
import { Button } from "@/components/ui/button";
import { MyInformationComponent } from "@/components/component/my-information";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ResumeList = dynamic(() => import("@/components/component/resume-list"), {
  loading: () => <Skeleton className={"w-full h-full"} />,
  ssr: false,
});
const DashboardPage = async () => {
  const userInfo = await getUserWithDetails();
  const user = userInfo.user;
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;

  return (
    <main className="bg-gray-50 min-h-[90dvh]">
      <div className="container mx-auto p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3b51a3]">
            Resume Dashboard
          </h1>
          <Button variant="outline" className="flex items-center gap-2">
            <span>{user.name}</span>
          </Button>
        </div>
        <Tabs defaultValue="myInformation" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="myInformation">My Information</TabsTrigger>
            <TabsTrigger value="myResumes">My Resumes</TabsTrigger>
          </TabsList>
          <TabsContent value="myInformation">
            <MyInformationComponent
              initialUserInfo={{
                personalInfo,
                experiences,
                educations,
                skills,
                languages,
                courses,
              }}
            />
          </TabsContent>
          <TabsContent value="myResumes">
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <ResumeList />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default DashboardPage;
