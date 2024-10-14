import { getUserWithDetails } from "@/actions/userInfo/action";
import { Button } from "@/components/ui/button";
import MyInformation from "@/components/component/my-information";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useTranslation } from "@/app/i18n";

const ResumeList = dynamic(() => import("@/components/component/resume-list"), {
  loading: () => <Skeleton className={"w-full h-full"} />,
  ssr: false,
});
const DashboardPage = async ({ params: { lng } }) => {
  const session = await auth();
  if (!session) redirect("/auth");
  const { t } = await useTranslation(lng, "common");
  const userInfo = await getUserWithDetails(session.user.email);
  const { personalInfo, experiences, educations, skills, languages, courses } =
    userInfo;

  return (
    <main className=" min-h-[90dvh]">
      <div className="container mx-auto p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3b51a3]">
            Resume Dashboard
          </h1>
          <Link
            href={`/gallery`}
            className="flex items-center gap-4 hover:bg-blue-600 rounded-md bg-[#3b51a3] px-4 py-2 text-white"
          >
            {t("createNewResume")}
            <Plus size={20} />
          </Link>
        </div>
        <Tabs defaultValue="myResumes" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger
              className="data-[state=active]:bg-[#3B51A3]"
              value="myResumes"
            >
              My Resumes
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#3B51A3]"
              value="myInformation"
            >
              My Information
            </TabsTrigger>
          </TabsList>
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
          <TabsContent value="myInformation">
            <MyInformation
              lng={lng}
              user={session.user}
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
        </Tabs>
      </div>
    </main>
  );
};
export default DashboardPage;
