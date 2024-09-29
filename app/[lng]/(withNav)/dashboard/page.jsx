import { ResumeDashboard } from "@/components/resume-dashboard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  return (
    <div className=" p-6 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3b51a3]">Resume Dashboard</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>John Doe</span>
        </Button>
      </div>
      <ResumeDashboard />
    </div>
  );
};
export default DashboardPage;
